import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader, Placeholder } from 'rsuite';
import { useAuth } from "../context/AuthProvider";
import { FaPen, FaTrashAlt,FaCheckCircle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal"; // Import your DeleteModal component

const MyBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [authUser] = useAuth();

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        setData(res.data.book);
        console.log(res.data.book)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setLoading(false);
      }
    };
    getBook();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Placeholder.Paragraph rows={8} />
        <Loader backdrop content="loading..." vertical />
      </div>
    );
  }

  if (!data) {
    return <div>Book not found</div>;
  }

  // const { title, name, theme,image, category, author, price, desc } = data;

  return (
    <>
      <Navbar />
      <section className="container mt-20 flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* Image gallery */}
        <div className="container mx-auto px-4">
          <div className="container mx-auto px-4">
            <img
              src={data.image}
              alt="Book Cover"
              className="w-full h-auto max-w-xs lg:max-w-md"
            />
          </div>
        </div>
        {/* Description */}
        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">{data.title}</h2>
          <div className="mt-1">
            <div className="flex items-center">
              <p className="ml-3 text-sm text-gray-400">{data.name}</p>
            </div>
          </div>
          <p className="mt-5 font-bold">
            Availability:{" "}
          </p>
          <p className="font-bold">
            Theme: <span className="font-normal">{data.theme}</span>
          </p>
          <p className="font-bold">
            Category: <span className="font-normal">{data.category}</span>
          </p>
          <p className="font-bold">
            Author: <span className="font-normal">{data.author}</span>
          </p>
          <p className="mt-4 text-4xl font-bold text-violet-900">
            ${data.price}{" "}
            {data.isVerified === true ? (<p>Verified</p>): (<p>Pending</p>)}
            <span className="text-xs text-gray-400 line-through">
              {/* ${data.previousPrice} */}
            </span>
          </p>
          {/* <p className="pt-5 text-sm leading-5 text-gray-500">{data.desc}</p> */}
          <div className="mt-6 text-green" >
          {data.isVerified === true ? (
            <div className="flex mr-3 gap-2 text-green">
              <FaCheckCircle className="mt-1 "/>
              Verified
            </div>
          ): (<p>Pending</p>)}
            {/* <p className="pb-2 text-xs text-gray-500">Size</p> */}
            <div className="flex gap-1">
              
            </div>
          </div>
          <div className="mt-7 flex flex-row items-center gap-6">
            <button
              className="flex h-12 mr-1 pr-1 pl-1 rounded-xl w-80 items-center justify-center bg-red-500 text-white duration-100 hover:bg-red-800"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              <FaTrashAlt className="mx-2" />
              Remove from Store
            </button>
            <button className="flex h-12 w-1/2 ml-4 mr-2 pr-3 items-center justify-center bg-blue-500 duration-100 rounded-xl hover:bg-blue-400"
              onClick={() => navigate(`/book/edit/${id}`)}>
              <FaPen className="mx-2" />
              Edit Details
            </button>
          </div>
        </div>
      </section>
      <div>
        <div dangerouslySetInnerHTML={{ __html: data.desc }} />
      </div>
      <DeleteModal bookId={id} /> {/* Render the modal and pass the bookId */}
    </>
  );
};

export default MyBookPage;
