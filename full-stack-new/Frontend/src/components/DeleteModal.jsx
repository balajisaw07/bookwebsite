import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function DeleteModal({ bookId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const [authUser]=useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/book/${bookId}`);
        setBook(res.data.book);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [bookId]);

  const onSubmit = async (data) => {
    const deleteText = data.text;
    if (deleteText === book.name) {
      try {
        await axios.delete(`http://localhost:4001/book/delete/${bookId}`);
        toast.success('Book deleted successfully');
        document.getElementById("my_modal_4").close();
        if(authUser.role[0]==="Admin"){
          navigate("/admin/books");
        }else{
          navigate('/user/:id/book'); 
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Error deleting book');
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link
              to="#"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_4").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Delete Book</h3>
            <div className="mt-4 space-y-2">
              {book ? (
                <>
                  <span>Write "</span>
                    <span className="text-red-500">{book.name}</span>
                    <span>" to confirm deletion</span>
                  <br />
                  <input
                    type="text"
                    placeholder={`Type "${book.name}" to confirm`}
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("text", { required: true })}
                  />
                  <br></br>
                  {errors.text && (
                    
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </>
              ) : (
                <span>Loading book details...</span>
              )}
            </div>
            <div className="flex justify-around mt-6">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default DeleteModal;
