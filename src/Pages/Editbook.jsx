import React, { useEffect, useState } from "react";
import axios from "axios";
import Backbutton from "../components/Backbutton";
import Spin from "../components/Spin";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://bookslibrary-backend-production.up.railway.app/books/${id}`);

      if (response.data) {
        console.log("Book data:", response.data);

        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      }
    } catch (error) {
      console.error("Error fetching book:", error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBook();
  }, [])


  // Function to update the book
  const handleUpdateBook = async () => {
    try {
      const updatedData = {
        title,
        author,
        publishYear,
      };
      setLoading(true);

      // Use PUT request for updating an existing book
      const response = await axios.put(
        `https://bookslibrary-backend-production.up.railway.app/books/${id}`,
        updatedData
      );

      if (response.data.book) {
        console.log("Book updated successfully!");
        navigate("/"); // Redirect to the home page
      } else {
        console.log("Failed to update book.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4 font-serif">Edit Book</h1>
      {loading ? <Spin /> : null}
      <div
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px]
       p-4 mx-auto"
      >
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-green-500 text-white rounded m-8 cursor-pointer hover:bg-green-700"
          onClick={handleUpdateBook}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default EditBook;