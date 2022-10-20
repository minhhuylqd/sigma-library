import { useDispatch, useSelector } from 'react-redux'

import { fetchAllBooksThunk, selectFilteredBookIds } from 'redux/slices/booksSlice'
import { selectAuthState } from 'redux/slices/authSlice'
import ListItem from './ListItem'
import { AppDispatch } from 'redux/store'
import { useEffect } from 'react'

const BookList = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllBooksThunk())
  }, [dispatch])

  const bookIds = useSelector(selectFilteredBookIds)
  const { isLogin, isActive } = useSelector(selectAuthState)

  const bookItems = bookIds.map((bookId) => (
    <ListItem key={bookId} id={bookId} isLogin={isLogin} isActive={isActive} />
  ))

  return (
    <div className="w-full max-w-[800px] lg:w-[80%] mx-auto grid grid-cols-2 lg:grid-cols-4 p-8 gap-4">
      {bookItems}
    </div>
  )
}

export default BookList
