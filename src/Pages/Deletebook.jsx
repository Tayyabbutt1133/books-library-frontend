import React, { useState } from "react";
import Backbutton from "../components/Backbutton.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spin from "../components/Spin.jsx";

const Deletebook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://bookslibrary-backend-production.up.railway.app/books/${id}`);
      if (response.data.message) {
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spin /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default Deletebook;
