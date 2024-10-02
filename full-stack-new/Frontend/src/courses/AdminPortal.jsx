import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import Logout from "../components/Logout";

const AdminPortal = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState("All"); // Default filter

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4001/book/all');
        setAllBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchAllBooks();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredBooks = allBooks.filter((book) => {
    if (filter === "All") return true;
    if (filter === "Pending") return !book.isVerified;
    if (filter === "Verified") return book.isVerified;
    return true;
  });

  return (
    <>
      <Logout />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
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
        </div>
        <div className="mt-4 space-y-2">
          <label htmlFor="role">Filter Books:</label>
          <select
            id="role"
            name="role"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
          </select>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredBooks.length ? (
            filteredBooks.map((item) => (
              <Cards
                key={item._id}
                item={item}
              />
            ))
          ) : (
            <p className="text-center col-span-4">No books found for the selected filter.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPortal;
