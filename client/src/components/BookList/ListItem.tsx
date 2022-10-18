import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllBooks, selectBookById } from 'redux/slices/booksSlice'
import { AppDispatch, RootState } from 'redux/store'
import { BACKEND_URL } from 'utils/configs'

type Item = {
  id: string
  isLogin: boolean
  isActive: boolean
}

const ListItem = ({ id, isLogin, isActive }: Item) => {
  const dispatch = useDispatch<AppDispatch>()

  const [borrowStatus, setBorrowStatus] = useState({
    status: '',
    message: ''
  })

  const token = localStorage.getItem('authToken')

  const book = useSelector((state: RootState) => selectBookById(state, id))

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
      dispatch(fetchAllBooks())
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
      console.log(error)
    }
  }

  const borrowBtn = (
    <button 
      className='border-2 border-light-gold-6 hover:bg-light-gold-1 rounded-3xl px-4 py-1'
      onClick={handleBorrowRequest}
    >
      Borrow
    </button>
  )

  return (
    <ul>
      <li>Title: {book.title}</li>
      <li>ISBN: {book.isbn}</li>
      <li>Copies: {book.availableCopies}</li>
      <li>
        Authors:{' '}
        {book.authorNames.map((author) => (
          <span key={author}>{author}, </span>
        ))}
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
