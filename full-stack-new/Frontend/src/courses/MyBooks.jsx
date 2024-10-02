import React, { useEffect, useState } from "react";
import Cards2 from "../components/Cards2";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import emptyimg from "../../public/emptyimg.jpg"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function MyBooks() {
  const [book, setBook] = useState([]);
  const [authUser] = useAuth();
  const [userId, setUserId] = useState();
  function handlenot(){

  }
  useEffect(() => {
    const getBook = async () => {
      if (authUser && authUser._id) {
        const userId=authUser._id
        if(!userId) console.log('not');
        try {
          const res = await axios.get(`http://localhost:4001/book/user/${userId}`);
          console.log(res.data);
          setBook(res.data.books);
        } catch (error) {
          console.log(error);
        }
      }
    

    };
    getBook();
  }, [authUser]);
  return (
    <>
      <Navbar/>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
            assumenda? Repellendus, iste corrupti? Tempore laudantium
            repellendus accusamus accusantium sed architecto odio, nisi expedita
            quas quidem nesciunt debitis dolore non aspernatur praesentium
            assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
            animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
            consequatur!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.length === 0 ? (
            <div className="empty-list-page">
            </div>
          ) : (
            book.map((item) => (
              <Cards2 key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default MyBooks;
