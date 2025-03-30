import React, { useState, useTransition, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spin.jsx";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://bookslibrary-backend-production.up.railway.app/books/");
      if (response.status === 200) {
        console.log("Response from server : ", response.data.data);
        setBooks(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Book List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-blue-600 text-4xl hover:text-blue-800 transition" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
            <table className="w-full text-left bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 text-center w-12">No</th>
                  <th className="p-4 text-left w-1/3">Title</th>
                  <th className="p-4 text-left w-1/4 max-md:hidden">Author</th>
                  <th className="p-4 text-left w-1/6 max-md:hidden">Year</th>
                  <th className="p-4 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={book._id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-center">{index + 1}</td>
                    <td className="p-4">{book.title}</td>
                    <td className="p-4 max-md:hidden">{book.author}</td>
                    <td className="p-4 max-md:hidden">{book.publishYear}</td>
                    <td className="p-4 text-center w-32">
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/books/details/${book._id}`}>
                          <BsInfoCircle className="text-xl text-blue-600 hover:text-blue-800 transition" />
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                          <AiOutlineEdit className="text-xl text-green-600 hover:text-green-800 transition" />
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                          <MdOutlineDelete className="text-xl text-red-600 hover:text-red-800 transition" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
