import React, { useEffect, useState } from "react";
import "../../public/wish.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emptyimg from "../../public/emptyimg.jpg";

function WishList() {
  const [authUser] = useAuth();
  const [Wish, setWish] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('hi');
  }, []);

  useEffect(() => {
    const getWish = async () => {
      if (authUser && authUser._id) {
        try {
          const res = await axios.get(`http://localhost:4001/user/${authUser._id}/wish`);
          const data = res.data;
          console.log(data); // Log the received data
          setWish(data); // Update the state with received data
        } catch (error) {
          console.log(error);
        }
      }
    };

    getWish();
  }, [authUser]); // Include authUser in the dependency array

  useEffect(() => {
    console.log("Updated Wish state:", Wish); // Log the state whenever it changes
  }, [Wish]);

  const handle = async (bookId) => {
    if (authUser) {
      const userId = authUser._id; // Assuming authUser has _id

      try {
        console.log('Book ID:', bookId);
        console.log('User ID:', userId);

        const response = await axios.delete(`http://localhost:4001/user/wish/${userId}`, {
          data: { bookId: bookId } // Ensure that the bookId is sent in the request body
        });

        console.log('Response:', response.data);
        setWish((prevWishlist) => prevWishlist.filter(book => book._id !== bookId));
        // navigate(`/user/${userId}/wish`);
      } catch (error) {
        console.error('Error deleting from wishlist:', error);
      }
    } else {
      console.log('User not authenticated');
    }
  };

  function handlenot() {
    navigate('/course');
  }

  return (
    <>
      <Navbar />
      <div>
        {Wish.length === 0 ? (
          <div className="empty-list-page">
            <img src={emptyimg} alt="Empty list" className="empty-list-image" />
            <h1>No items found</h1>
            <p>Try searching or adding a new item</p>
            <button className="btn" onClick={handlenot}>Add new item</button>
          </div>
        ) : (
          <ul>
            {Wish.map((item, index) => (
              <li key={index} className="product">
                <div>
                <img src={item.image} alt={item.name} className="w-100"/>
                </div>
                <div className="product-info">
                  <b><h1>Author: {item.author}</h1></b>
                  <h3>Title: {item.title}</h3>
                  <p>Name: {item.name}</p>
                  <p>Category: {item.category}</p>
                  <p>Theme: {item.theme}</p>
                  <p>Language: {item.language}</p>
                  <p>Pages: {item.pages}</p>
                  <p>Name: {item.name}</p>
                  <p>Price: ${item.price}</p>
                  <hr className="horizontal-line" />
                  <i><p>Description: <div dangerouslySetInnerHTML={{ __html: item.desc }} /></p></i>
                  <button onClick={() => handle(item._id)} className="remove-btn">Remove from Wishlist</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default WishList;
