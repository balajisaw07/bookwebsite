// src/components/Banner.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import banner from "../../public/Banner.png";

function Banner() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(query.trim() !== ""){
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col-reverse md:flex-row my-10">
      <div className="order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
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

            <form onSubmit={handleSearch}>
              <label className="input input-bordered flex items-center gap-2">

                <input
                  type="text"
                  value={query}
                  className="grow"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for Books | Novels | Articles"
                />
              </label>
              <button className="btn mt-6 btn-secondary">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
