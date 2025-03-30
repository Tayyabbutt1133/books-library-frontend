import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Backbutton from '../components/Backbutton.jsx'
import Spinner from '../components/Spin.jsx'
import axios from 'axios'

const Showbook = () => {

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  const showbook = async () => {
    try {
      setLoading(true);
      const book_response = await axios.get(`https://bookslibrary-backend-production.up.railway.app/books/${id}`);
        console.log("Data from server : ", book_response.data)
        setBook(book_response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    showbook();
  }, [])


  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4 font-serif'>Book Details</h1>
      {
        loading ? (
        <Spinner/>
        ): (
            <div className='flex flex-col border-sky-400 rounded-xl w-fit p-4'>
              <div className='my-4'>
                <span className='text-lg mr-4 text-gray-400'>Id : </span>
                <span>{book._id}</span>
              </div>
              <div className='my-4'>
                <span className='text-lg mr-4 text-gray-400'>Title : </span>
                <span>{book.title}</span>
              </div>
              <div className='my-4'>
                <span className='text-lg mr-4 text-gray-400'>Publish Year : </span>
                <span>{book.publishYear}</span>
              </div>
              <div className='my-4'>
                <span className='text-lg mr-4 text-gray-400'>Created Time : </span>
                <span>{new Date(book.createdAt).toString()}</span>
              </div>
              <div className='my-4'>
                <span className='text-lg mr-4 text-gray-400'>Last Updated Time : </span>
                <span>{new Date(book.updatedAt).toString()}</span>
              </div>
            </div>
        )
      }
    </div>
  )
}

export default Showbook
