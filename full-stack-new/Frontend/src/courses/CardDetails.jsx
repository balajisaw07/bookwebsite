import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Navbar from '../components/Navbar';
import Loader from '../../Loader/loader'; // Import the Loader component

function CardDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const data = res.data;
        console.log(data);
        console.log(id);
        setData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    getBook();
  }, [id]);

  let card = null;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element._id === id) {
      card = element;
      break;
    }
  }

  if (loading) {
    return <Loader />; // Show loader while data is loading
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h2>{card.title}</h2>
        <p>{card.name}</p>
        <p>{card.price}</p>
        {/* Add more card details here */}
      </div>
    </>
  );
}

export default CardDetail;
