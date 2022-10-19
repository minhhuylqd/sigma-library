import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAuthorsEntities } from 'redux/slices/authorsSlice'

import { fetchAllBooksThunk, selectBookById } from 'redux/slices/booksSlice'
import { AppDispatch, RootState } from 'redux/store'
import { BACKEND_URL } from 'utils/configs'

type Item = {
  id: string
  isLogin: boolean
  isActive: boolean
}

const ListItem = ({ id, isLogin, isActive }: Item) => {
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const [borrowStatus, setBorrowStatus] = useState({
    status: '',
    message: ''
  })

  const token = localStorage.getItem('authToken')

  const book = useSelector((state: RootState) => selectBookById(state, id))

  const authorEntities = useSelector(selectAuthorsEntities)

  const handleBorrowRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/borrowers`,
        {
          bookId: id
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
    <span
      key={authorId}
      onClick={(event) => {
        event.stopPropagation()
        navigate(`/authors/${authorId}`)
      }}
    >{authorEntities[authorId].name}, </span>
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
      <ul 
        className='hover:bg-light-gold-1 hover:cursor-pointer rounded-lg p-4'
        onClick={(event) => {
          event.stopPropagation()
          navigate(`/books/${book._id}`)
        }}
      >
        <li>Title: {book.title}</li>
        <li>ISBN: {book.isbn}</li>
        <li>Copies: {book.availableCopies}</li>
        <li>
          Authors:{' '}
          {
            authors
          }
        </li>
        <li>
          {
            book.availableCopies > 0
              ? ((isLogin && isActive) ? borrowBtn : 'Login with Active Account to borrow')
              : 'Out of Copies'
          }
        </li>
        {
          borrowStatus.status === 'SUCCESS' && <li>{borrowStatus.message}</li>
        }
        {
          borrowStatus.status === 'FAIL' && <li>{borrowStatus.message}</li>
        }
    </ul>
  )
}

export default ListItem
