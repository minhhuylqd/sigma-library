import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { fetchAllBooksThunk, selectBookById } from 'redux/slices/booksSlice'
import { selectAuthorsEntities } from 'redux/slices/authorsSlice'
import { selectAuthState } from 'redux/slices/authSlice'
import { AppDispatch, RootState } from 'redux/store'
import { BACKEND_URL, COVER_URL } from 'utils/configs'
import RecommendReadings from 'components/RecommendReadings'

const BookProfile = ({bookId}: {bookId: string}) => {

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const { isLogin, isActive, isAdmin } = useSelector(selectAuthState)

  useEffect(() => {
    dispatch(fetchAllBooksThunk())
  }, [dispatch])

  const book = useSelector((state: RootState) => selectBookById(state, bookId))

  const authorEntities = useSelector(selectAuthorsEntities)

  const [borrowStatus, setBorrowStatus] = useState({
    status: '',
    message: ''
  })

  const token = localStorage.getItem('authToken')

  const thumbnail = `${COVER_URL}${book.isbn}-M.jpg`

  const handleBorrowRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/borrowers`,
        {
          bookId: bookId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch(fetchAllBooksThunk())
      if (response.status === 200 && response.data) {
        setBorrowStatus({
          status: 'SUCCESS',
          message: 'Borrowed Successfully!'
        })
      }
      else {
        setBorrowStatus({
          status: 'FAIL',
          message: 'Borrow Failed!'
        })
      }
    } catch (error) {
      setBorrowStatus({
        status: 'FAIL',
        message: 'Borrow Failed!'
      })
      console.log(error)
    }
  }

  const authorIds = book.authors || []
  const authors = authorIds.map((authorId) => (
    <p
      key={authorId}
      onClick={(event) => {
        event.stopPropagation()
        navigate(`/authors/${authorId}`)
      }}
      className="italic text-sm cursor-pointer"
    >{authorEntities[authorId].name}</p>
  ))


  const borrowBtn = (
    <button 
      className='border-2 border-light-gold-6 hover:bg-light-gold-1 rounded-3xl px-4 py-1 active:bg-light-gold-6 active:text-light-primary'
      onClick={ (event) => {
        event.stopPropagation()
        handleBorrowRequest()
      }
      }
    >
      Borrow
    </button>
  )

  return (
    <div className='p-10 flex'>
      <div className='w-[30%] flex flex-col items-center gap-4'>
        <img 
          src={thumbnail} 
          alt="Book Cover" 
          className='max-w-[200px] h-auto'
        />
        {
          book.availableCopies > 0
            ? ((isLogin && isActive) ? borrowBtn : <i className='text-sm'>Login with Active Account to borrow</i>)
            : <i className='text-sm'>Out of Copies</i>
        }
        {
          borrowStatus.status !== '' && <i>{borrowStatus.message}</i>
        }
      </div>
      <div className='w-[70%] flex flex-col gap-4'>
        <div>
          <h1 className='text-xl border-b-2 border-light-gold-6 inline'>
            {book.title}
          </h1>
          {authors}
          <p className='italic text-sm'>Publisher: {book.publisher || ''}</p>
        </div>
        <p>{book.description}</p>
        <p>ISBN: {book.isbn}</p>
        <div className='mt-16'>
          <h2 className='italic'>Recommend Readings</h2>
          <RecommendReadings />
        </div>
      </div>
    </div>
  )
}

export default BookProfile