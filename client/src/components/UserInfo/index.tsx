import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/authSlice'
import {
  selectBooksEntities,
} from 'redux/slices/booksSlice'
import { fetchBorrowedHistoryThunk, selectBorrowedHistory } from 'redux/slices/borrowerSlice'
import { AppDispatch } from 'redux/store'

const UserInfo = () => {

  const dispatch = useDispatch<AppDispatch>()

  const { isLogin, userInfo } = useSelector(selectAuthState)

  useEffect(() => {
    dispatch(fetchBorrowedHistoryThunk())
  }, [dispatch])


  const bookList = useSelector(selectBooksEntities)
  const borrowedHistory = useSelector(selectBorrowedHistory)

  const borrowList = borrowedHistory.map((borrower) => {
    const bookTitle = bookList[borrower.bookId].title
    return (
      <div key={borrower._id}>
        <ul>
          <li>Title: {bookTitle}</li>
          <li>Borrow at: {borrower.borrowedDate}</li>
          <li>Due date: {borrower.dueDate}</li>
          <li>Is returned: {borrower.returnedDate ? borrower.returnedDate : 'false'}</li>
        </ul>
      </div>
    )
  })

  
  if (!isLogin) {
    return (
      <div className="w-full max-w-[1300px] min-h-screen h-full mx-auto p-8">
        <h1>Please Login first</h1>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1300px] min-h-screen h-full mx-auto p-8">
      <h1 className="py-4">This is profile info</h1>
      <ul>
        <li>Email: {userInfo.email}</li>
        <li>Display Name: {userInfo.displayName}</li>
      </ul>
      <div className='flex flex-col gap-2 my-2'>
        {borrowList}
      </div>
    </div>
  )
}

export default UserInfo
