import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch } from 'redux/store'
import { fetchBorrowedHistoryThunk, selectBorrowedHistory } from 'redux/slices/borrowerSlice'
import { selectBooksEntities } from 'redux/slices/booksSlice'
import axios from 'axios'
import { BACKEND_URL } from 'utils/configs'

const BorrowedHistory = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBorrowedHistoryThunk())
  }, [dispatch])


  const bookList = useSelector(selectBooksEntities)
  const borrowedHistory = useSelector(selectBorrowedHistory)

  const token = localStorage.getItem('authToken')


  const handleReturn = async (borrowerId: string) => {
    try {
      await axios.put(
        `${BACKEND_URL}/borrowers/${borrowerId}`,
        {
          returnedDate: Date.now()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch(fetchBorrowedHistoryThunk())
    } catch (error) {
      console.log(error)
    }
  }

  const borrowList = borrowedHistory.map((borrower) => {
    const bookTitle = bookList[borrower.bookId].title
    return (
      <div 
        key={borrower._id}
        className='my-2'
      >
        <ul>
          <li>Title: {bookTitle}</li>
          <li>Borrow at: {new Date(borrower.borrowedDate).toDateString()}</li>
          <li>Due date: {new Date(borrower.dueDate).toDateString()}</li>
          <li>
            {
              borrower.returnedDate 
              ? ('Returned at ' + new Date(borrower.returnedDate).toDateString() )
              : (
                <button
                  className='border-2 border-light-gold-6 hover:bg-light-gold-1 rounded-3xl px-4 py-1'
                  onClick={() => {handleReturn(borrower._id)}}
                >
                  Return Book
                </button>
              )
            }
          </li>
        </ul>
      </div>
    )
  })

  return (
    <div className='flex flex-col gap-2 my-2'>
      {borrowList}
    </div>
  )
}

export default BorrowedHistory