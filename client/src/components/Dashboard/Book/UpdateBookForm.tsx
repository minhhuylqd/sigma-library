import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {AiOutlineCloseCircle} from 'react-icons/ai'

import { Book } from 'utils/types'
import { BACKEND_URL } from 'utils/configs'
import { AppDispatch } from 'redux/store'
import { fetchAllBooksThunk } from 'redux/slices/adminSlice'

const UpdateBookForm = ({book, isOpen, toggleIsOpen}: {
  book: Book,
  isOpen: boolean,
  toggleIsOpen: () => void
}) => {

  const dispatch = useDispatch<AppDispatch>()

  const [title, setTitle] = useState(book.title)
  const [isbn, setIsbn] = useState(book.isbn)
  const [copies, setCopies] = useState(book.copies)
  const [status, setStatus] = useState('')

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value)
  }

  const handleCopiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCopies(Number(event.target.value))
  }

  const token = localStorage.getItem('authToken')!

  
  const submitUpdate = async () => {
    try {
      const response = await axios.put(`${BACKEND_URL}/books/${book._id}`, {
        title: title,
        isbn: isbn,
        copies: copies
      },
      {headers: {
        Authorization: `Bearer ${token}`,
      }})
      if (response.status === 200) {
        setStatus('Update Successfully')
      } else {
        setStatus('Update Failed')
      }
      dispatch(fetchAllBooksThunk())
    } catch (error) {
      setStatus('Update Failed')
      console.log(error)
    }
  }

  return (
    <div className={!isOpen ? "hidden" : "fixed top-0 left-0 w-full h-screen bg-black/50 z-[10000]"} onClick={toggleIsOpen}>
      <div
        className="absolute top-[50%] left-[50%] w-[50%] h-[80%] -translate-x-[50%] -translate-y-[50%] bg-light-primary rounded-xl
                      flex flex-col p-4 text-base text-dark-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Form Title + Close Button */}
        <div className='flex items-center justify-between text-xl mb-8'>
          <h1 className='border-b-2 border-light-gold-6'>
            Update Book
          </h1>
          <button 
            onClick={toggleIsOpen}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className='flex flex-col max-w-[80%] ml-5 w-full justify-center gap-4 mb-8'>
          <div className='grid grid-cols-5'>
            <label htmlFor="book-title w-full col-span-1">Title</label>
            <input 
              type="text" 
              className='border border-dark-primary rounded-lg col-span-4 py-1 px-4'
              id='book-title'
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className='grid grid-cols-5'>
            <label htmlFor="book-title w-full col-span-1">ISBN</label>
            <input 
              type="text" 
              className='border border-dark-primary rounded-lg col-span-4 py-1 px-4'
              id='book-title'
              value={isbn}
              onChange={handleIsbnChange}
            />
          </div>
          <div className='grid grid-cols-5'>
            <label htmlFor="book-title w-full col-span-1">Copies</label>
            <input 
              type="text" 
              className='border border-dark-primary rounded-lg col-span-4 py-1 px-4'
              id='book-title'
              value={copies}
              onChange={handleCopiesChange}
            />
          </div>
        </div>
        <div className='flex w-full justify-center items-center'>
          <button
            className='py-1 px-4 border-2 rounded-3xl border-light-gold-6 hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary'
            onClick={submitUpdate}
          >
            Update
          </button>
        </div>
        <div className='flex w-full justify-center items-center my-4'>
          {status !== '' && <i>{status}</i>}
        </div>
      </div>
    </div>
  )
}

export default UpdateBookForm