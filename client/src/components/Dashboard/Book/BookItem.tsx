import React, {useState} from 'react'
import axios from 'axios'

import { Book, Author } from 'utils/types'
import UpdateBookForm from './UpdateBookForm'
import { BACKEND_URL } from 'utils/configs'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import { fetchAllBooksThunk } from 'redux/slices/adminSlice'

const BookItem = ({bookId, bookEntities, authorEntities}: {
  bookId: string,
  bookEntities: {
    [bookId: string]: Book
  },
  authorEntities: {
    [authorId: string]: Author
  }
}) => {

  const book = bookEntities[bookId]

  const [updateOpen, setUpdateOpen] = useState(false)

  const toggleUpdateOpen = () => setUpdateOpen(prevState => !prevState)

  const token = localStorage.getItem('authToken')

  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/books/${book._id}`,
      {headers: {
        Authorization: `Bearer ${token}`,
      }})
      dispatch(fetchAllBooksThunk())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {book.title}
      </th>
      <td className="py-4 px-6">
        {book.isbn}
      </td>
      <td className="py-4 px-6">
        {
          book.authors
            ? book.authors.map(authorId => <p key={authorId}>{authorEntities[authorId].name}</p>)
            : ''
        }
      </td>
      <td className="py-4 px-6">
        {
          book.publisher || ''
        }
      </td>
      <td className="py-4 px-6">
        {book.copies}
      </td>
      <td className="py-4 px-6">
        <button 
          className='italic hover:underline hover:text-light-gold-6'
          onClick={() => {setUpdateOpen(true)}}
        >
          Update
        </button>
      </td>
      <td className="py-4 px-6">
        <button 
          className='italic hover:underline hover:text-light-gold-6'
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    <UpdateBookForm book={book} isOpen={updateOpen} toggleIsOpen={toggleUpdateOpen} />
  </tr>
  )
}

export default BookItem