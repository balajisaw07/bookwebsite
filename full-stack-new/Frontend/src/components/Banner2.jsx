// src/components/Banner.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import book from "../../public/book.png";
import { useAuth } from "../context/AuthProvider";
import Login from "./Login";
import toast from "react-hot-toast";

function Banner() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [ authUser ] = useAuth();
  function handle(){
    if(authUser && authUser.role[0]==="Author"){
      navigate('/book/list');
    }else if(!authUser){
      // navigate('/login');
      document.getElementById("my_modal_3").showModal();
      <Login/>
    }else{
      toast.error("You are not allowed");
    }
  }

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
      <div className="order-1 w-full mt-20 md:w-1/2 opacity-8">
          <img
            src={book}
            className="md:w-[550px] md:h-[460px] md:ml-12 bg-inherit z"
            alt="Banner"
          />
        </div>
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcome here to learn something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              et totam. Tempora amet atque expedita, quae corrupti totam sed
              pariatur corporis at veniam est voluptas animi!
            </p>
 
              <button onClick={handle} className="btn mt-6 btn-secondary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
