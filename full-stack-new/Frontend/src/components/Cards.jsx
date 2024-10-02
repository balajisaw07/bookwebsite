import React from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";

function Cards({ item }) {
  const navi = useNavigate();
  const [authUser]=useAuth();

  useEffect(() => {
    console.log(item);

    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const handleClick = () => {
    if(authUser && authUser.role[0]==="Admin"){
      navi(`/admin/book/${item._id}`)
    }else{
      navi(`/book/${item._id}`);
    }
  };

  return (

    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt="Shoes" style={{width:'100', height:'20'}} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              {/* <div className="badge badge-secondary">{item.category}</div> */}
            </h2>
            <p>{item.title}</p>
            {item.isVerified===true ? (
                <div className="badge badge-success">Verified</div>
              ) : (
                <div className="badge badge-error">Pending</div>
              )}
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <div className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                <button onClick={handleClick}>See More</button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
