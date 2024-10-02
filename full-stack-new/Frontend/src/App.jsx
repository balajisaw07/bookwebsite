import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ListBook from "./components/ListBook";
import BookPage from "./courses/BookPage";
import WishList from "./courses/WishList";
import MyBooks from "./courses/MyBooks";
import MyBookPage from "./courses/MyBookPage";
import SearchPage from "./courses/SearchPage";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import AdminPortal from "./courses/AdminPortal";
import AdminCard from "./components/AdminCard";

function App() {
  const navigate = useNavigate();  
  const [authUser] = useAuth();  

  function handleAuth(){
    // toast.error("You are not allowed"); 
    <Home t={true}/>
    // toast.error("You are not allowed"); 
  }

  const ProtectedRoute = ({ element, redirectTo }) => {
    return authUser ? element : <Navigate to={redirectTo} />;
  };

  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/admin/books" element={<AdminPortal/>} />
        <Route path="/admin/book/:id" element={<AdminCard />} />
        <Route
          path="/book/list" 
          element={
              authUser ? <ListBook /> : <Signup/> 
          } 
        />
        <Route path="/user/:id/book" element={<MyBooks />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/user/:id/wish" 
          element={<ProtectedRoute element={<WishList />} redirectTo="/signup" />} 
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/edit/:id" element={<ListBook />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/card/:id" element={<CardDetails />} /> */}
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/mybook/:id" element={<MyBookPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
