import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './list.css';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import EmailTemplate from './EmailTemplate';
import ReactDOMServer from 'react-dom/server';

function ListBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [authUser] = useAuth();
    const [desc, setDesc] = useState("");
    const [book, setBook] = useState(null);
    const [img, setImg] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue // use setValue to set form values programmatically
    } = useForm();

    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:4001/book/${id}`);
                    const bookData = response.data.book;
                    if (bookData) {
                        setBook(bookData);
                        setDesc(bookData.desc || "");
                        setImg(bookData.image || "");
                        // Pre-fill the form values
                        setValue("title", bookData.title);
                        setValue("price", bookData.price);
                        setValue("name", bookData.name);
                        setValue("category", bookData.category);
                        setValue("theme", bookData.theme);
                        setValue("pages", bookData.pages);
                        setValue("language", bookData.language);
                        setValue("author", bookData.author);
                        setValue("image", bookData.image);
                    }
                } catch (error) {
                    console.error("Error fetching book details:", error);
                }
            }
        };
        fetchBook();
    }, [id, setValue]);

    const handleQuillChange = (value) => {
        setDesc(value);
    };

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
        // setImg(event.target.files[0]);
    };

    const sendEmailNotification = async (imageUrl) => {
        try {
            const html = `<html>
                <body>
                    <h1 className="text-green">Your Book Uploaded Seccussefuly</h1>
                    Your Book has been successfully Uploaded. I will be soon verify.
                    <p>Thank you for using our service!</p>`;
            await axios.post('http://localhost:4001/book/send-email', {
                email: `${authUser.email}`,   // User's email address
                subject: 'Your Book has been uploaded!',
                message: html,
            });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        if (!img) {
            console.log("not")
        }
        const userInfo = {
            title: data.title,
            price: data.price,
            name: data.name,
            desc: desc,
            category: data.category,
            theme: data.theme,
            pages: data.pages,
            language: data.language,
            author: data.author,
            image: img,
            userId: authUser ? authUser._id : null,
        };

        console.log(userInfo)

        try {
            let response;
            if (book) {
                // Update existing book
                response = await axios.put(`http://localhost:4001/book/edit/${book._id}`, userInfo);
                toast.success("Updated Successfully");
            } else {
                // Add new book
                response = await axios.post("http://localhost:4001/book/post", userInfo);
                sendEmailNotification(response.url);
                toast.success("Added Successfully");
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error("Error: " + (err.response ? err.response.data.message : "An unexpected error occurred"));
        }
    };

    return (
        <>
            <div className="h-100">
                <Navbar />
                <div className="newPostPage">
                    <div className="formContainer">
                        <h1 className='head'>{book ? "Edit Book" : "Add a New Book"}</h1>
                        <div className="wrapper">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="item">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        {...register('title', { required: 'Title is required' })}
                                    />
                                    {errors.title && <span>{errors.title.message}</span>}
                                </div>
                                <div className="item">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        {...register('price', { required: 'Price is required' })}
                                    />
                                    {errors.price && <span>{errors.price.message}</span>}
                                </div>
                                <div className="item">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        {...register('name', { required: 'Name is required' })}
                                    />
                                    {errors.name && <span>{errors.name.message}</span>}
                                </div>
                                <div className="item">
                                    <label htmlFor="image">Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleImage}
                                    />
                                    {img && <img src={img} alt="Uploaded preview" />}
                                </div>
                                <div className="item description">
                                    <label htmlFor="desc">Description</label>
                                    <ReactQuill
                                        id='desc'
                                        value={desc}
                                        theme="snow"
                                        onChange={handleQuillChange}
                                    />
                                </div>
                                <div className="item">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        name="category"
                                        {...register('category', { required: 'Category is required' })}
                                    >
                                        <option value="apartment">Apartment</option>
                                        <option value="house">House</option>
                                        <option value="condo">Condo</option>
                                        <option value="land">Land</option>
                                    </select>
                                    {errors.category && <span>{errors.category.message}</span>}
                                </div>
                                <div className="item">
                                    <label htmlFor="theme">Theme</label>
                                    <select
                                        id="theme"
                                        name="theme"
                                        {...register('theme', { required: 'Theme is required' })}
                                    >
                                        <option value="owner">Owner is responsible</option>
                                        <option value="tenant">Tenant is responsible</option>
                                        <option value="shared">Shared</option>
                                    </select>
                                    {errors.theme && <span>{errors.theme.message}</span>}
                                </div>
                                <div className="item">
                                    <label htmlFor="pages">Total Pages:</label>
                                    <input
                                        min={0}
                                        id="pages"
                                        name="pages"
                                        type="number"
                                        {...register('pages', { required: 'Total Pages is required' })}
                                    />
                                    {errors.pages && <span>{errors.pages.message}</span>}
                                </div>
                                <div className="item">
                                    <label htmlFor="language">Language:</label>
                                    <input
                                        id="language"
                                        name="language"
                                        type="text"
                                        {...register('language', { required: 'Language is required' })}
                                    />
                                    {errors.language && <span>{errors.language.message}</span>}
                                </div>
                                <div className="item">
                                    <label htmlFor="author">Author</label>
                                    <input
                                        id="author"
                                        name="author"
                                        type="text"
                                        {...register('author', { required: 'Author is required' })}
                                    />
                                    {errors.author && <span>{errors.author.message}</span>}
                                </div>
                                <button className="sendButton" type="submit">{book ? "Update" : "Add"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListBook;
