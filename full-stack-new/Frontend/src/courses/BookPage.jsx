import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import book from "../../public/book.png"
import { Loader, Placeholder } from 'rsuite';
import { useAuth } from "../context/AuthProvider";
import Signup from "../components/Signup";
import toast from "react-hot-toast";
// import { ToastContainer ,toast} from 'react-toastify';
// import { default as jwt_decode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaPen } from "react-icons/fa";
import DeleteModal from "../components/DeleteModal";
const BookPage = () => {
  const { id } = useParams();
  // const { currentUser, updateUser } = useContext(authUser);
  const navi = useNavigate();
  // const [authUser]=useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useAuth();
  const [userId, setUserId] = useState('');
  const handle1 = async () => {
    if (authUser) {
      const bookId = id;
      console.log(bookId);
      // console.log(userId);
      const userId = authUser._id;
      await axios.post(`http://localhost:4001/user/wishlist/${userId}`, {
        bookId: bookId
      })
      toast.success("Book Added in WishList Successfully");
      navi('/');
      console.log(userId)
    } else {
      navi('/signup');
    }
  }

  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    if (count >= 9) {
      toast.error("Max 10 allowed")
      setCount(10);
    }
    else {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count == 1) {
      toast.error("Select atleast 1 Book");
      setCount(1);
    }
    else {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem('token');
    const getBook = async () => {
      try {
        if (authUser) {
          setUserId(authUser._id);
        }
        const res = await axios.get(`http://localhost:4001/book/${id}`);
        // const data = res.data;
        console.log(res.data.book);
        console.log(res.data.user);
        console.log(authUser);
        console.log(id);
        setUserId(res.data.user._id);
        setData(res.data.book);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBook();
  }, [id]);


  if (loading) {
    return <div>
      <Placeholder.Paragraph rows={8} />
      <Loader backdrop content="loading..." vertical />
    </div>
  }


  return (
    <>
      <Navbar />
      <section className="container mt-20 flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* image gallery */}
        <div className="container mx-auto px-4">
          <img src={data.image} alt="" />
        </div>
        {/* description */}
        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">{data.title}</h2>
          <div className="mt-1">
            <div className="flex items-center">
              {/* <Rater
                style={{ fontSize: "20px" }}
                total={5}
                interactive={false}
                rating={card.rating} // Use the rating from card
              /> */}
              <p className="ml-3 text-sm text-gray-400">{data.name}</p>
            </div>
          </div>
          <p className="mt-5 font-bold">
            Availability:{" "}
            {/* {card.availability ? (
              <span className="text-green-600">In Stock </span>
            ) : (
              <span className="text-red-600">Expired</span>
            )} */}
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
            <span className="text-xs text-gray-400 line-through">
              {/* ${card.previousPrice} */}
            </span>
          </p>
          {/* <p className="pt-5 text-sm leading-5 text-gray-500">{card.desc}</p> */}
          <div className="mt-6">
            {/* <p className="pb-2 text-xs text-gray-500">Size</p> */}
            <div className="flex gap-1">
            </div>
          </div>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Quantity</p>
            <div className="flex">
              <button className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                onClick={handleDecrement}>
                −
              </button>
              <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                {count}
              </div>
              <button className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                onClick={handleIncrement}>
                +
              </button>
            </div>
          </div>
          <div className="mt-7 flex flex-row items-center gap-6">
            {
              authUser && authUser._id === userId ? (
                <button
                  className="flex h-12 mr-1 pr-1 pl-1 rounded-xl w-80 items-center justify-center bg-red-500 text-white duration-100 hover:bg-red-800"
                  onClick={() => document.getElementById("my_modal_4").showModal()}
                >
                  <FaTrashAlt className="mx-2" />
                  Remove from Store
                </button>
              ) : (

                <button
                  className="flex h-12 mr-1 pr-1 pl-1 rounded-xl w-80 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
                >
                  <BiShoppingBag className="mx-2" />
                  Add to cart
                </button>
              )
            }
            {
              authUser && authUser._id === userId ? (
                <button className="flex h-12 w-1/2 ml-4 mr-2 pr-3 items-center justify-center bg-blue-500 duration-100 rounded-xl hover:bg-blue-400"
                  onClick={() => navi(`/book/edit/${id}`)}>
                  <FaPen className="mx-2" />
                  Edit Details
                </button>
              ) : (

                <button className="flex h-12 w-1/2 ml-4 mr-2 pr-3  items-center justify-center bg-amber-400 duration-100 rounded-xl hover:bg-yellow-300"
                  onClick={handle1}>
                  <AiOutlineHeart className="mx-2" />
                  Wishlist
                </button>
              )
            }


          </div>
        </div>
        {/* <p className="pt-30 text-2xl font-bold lg:pt-0">{card.desc}</p> */}
      </section>
      <div>
        {/* <p className="pt-30 text-2xl font-bold lg:pt-0">{card.desc}</p> */}
        <div dangerouslySetInnerHTML={{ __html: data.desc }} />
      </div>
      <DeleteModal bookId={id} />
    </>
  );
};

export default BookPage;
