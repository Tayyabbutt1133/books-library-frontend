import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Backbutton from '../components/Backbutton'
import Spin from '../components/Spin'
import { useNavigate } from 'react-router-dom'

const Createbook = () => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setpublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmitBooks = async () => {

    try {
      const data = {
        title,
        author,
        publishYear
      }
      setLoading(true);
      const response = await axios.post("https://bookslibrary-backend-production.up.railway.app/books", data);
      if (response.data.success) {
        navigate('/');
        console.log("Book created successfully!");
      } else {
        console.log("Failed to create book.");
      }
    } catch (error) {
      console.error("Error creating books:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4 font-serif'>Create Book</h1>
      {loading ? <Spin /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px]
       p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
          
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
          
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type='number' value={publishYear} onChange={(e) => setpublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />  
        </div>
        <button className='p-2 bg-sky-300 m-8 cursor-pointer' onClick={handleSubmitBooks}>
          Create Book
        </button>
      </div>
    </div>
  )
}

export default Createbook
