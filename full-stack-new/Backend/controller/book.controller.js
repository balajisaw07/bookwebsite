import Book from "../model/book.model.js";
import User from "../model/user.model.js";
import cloudinary from 'cloudinary';
import path from "path";
export const getBook = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('books');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const bookData = {
      books: user.books,
      userID: userId
    }
    res.status(200).json(bookData);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const getAllBook = async (req, res) => {
  try {
    const book = await Book.find();
    console.log(book);
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

async function uploadToCloudinary(file, folder, quality,width,height) {
  const options = {
    folder,                
    resource_type: 'auto',
    transformation: []   
  };
  options.resource_type = "auto";

  if (quality) {
    options.quality = quality;
  }

  if (width || height) {
    options.transformation.push({
      width: width || undefined,   
      height: height || undefined, 
      crop: 'limit'
    });
  }

  try {
    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (error) {
    console.log('Cloudinary Upload Error:', error);
    throw error;
  }
}

function isFileSupport(type, supportExt) {
  return supportExt.includes(type);
}


export const postBook = async (req, res) => {
  try {
    const { name, price, category, desc, title, author, image, pages, theme, language, userId } = req.body;
    console.log(price);
    const file = req.body.image;

    const supportExt = ['jpg', 'png', 'jpeg'];

    const response = await uploadToCloudinary(file, "FileFolder",30,10,10);
    console.log(response);


    const BookData = await Book.create({
      name: name,
      price: price,
      category: category,
      desc: desc,
      title: title,
      author: author,
      pages: pages,
      theme: theme,
      language: language,
      image: response.secure_url,
    });


    const bookId = BookData._id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { books: bookId } },
      { new: true, useFindAndModify: false }
    ).populate('books');

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: BookData,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const verifyBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log("b",bookId)
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { isVerified: true },
      { new: true }
    );
    
    res.status(200).json({ message: 'Book verified successfully.', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify Book.' });
  }
};

export const editBook = async (req, res) => {
  const bookId = req.params.id;
  const { name, price, category, desc, image, title, author, pages, theme, language, userId } = req.body;
  try {
    const newBook = await Book.findByIdAndUpdate(bookId,
      { name, price, category, desc, image, title, author, pages, theme, language }
    )

    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchBook = async (req, res) => {
  const query = req.params.query?.toLowerCase(); // Convert query to lowercase
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is missing' });
  }

  try {
    console.log(`Searching for books with query: "${query}"`); // Log the query

    const book = await Book.find({
      title: { $regex: query, $options: 'i' } // Case-insensitive search for title
    });

    console.log(`Found ${book.length} books`); // Log the number of books found
    res.json(book);
  } catch (error) {
    console.error('Error searching for books:', error); // Log the actual error
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    // Find and delete the book
    const book = await Book.findByIdAndDelete(bookId);
    console.log(`Deleting book with ID: ${bookId}`);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Remove the book reference from all users
    await User.updateMany(
      { books: bookId },
      { $pull: { books: bookId } }
    );

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    if (!bookId) { return res.status(404).json({ message: 'Book not found' }); }
    console.log(`Fetching book with ID: ${bookId}`);
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    console.log(book);
    const user = await User.findOne({ books: bookId }, 'email');
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);

    const response = {
      book: book,
      user: user
    };

    console.log(response)

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
