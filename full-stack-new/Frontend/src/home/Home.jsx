import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import ListBook from "../components/ListBook";
import Banner2 from "../components/Banner2";
import TopSelling from "../components/TopSelling";
import toast from "react-hot-toast";

function Home({t}) {
  useEffect(() => {
    if(t){
      toast.error("You are Not Alowed")
    }
  },[])
  return (
    <>
      <Navbar />
      <Banner />
      <Freebook />
      <Banner2/>
      <TopSelling/>
      <Footer />
    </>
  );
}

export default Home;
