import { useDispatch, useSelector } from 'react-redux'

import { fetchAllBooks, selectFilteredBookIds } from 'redux/slices/booksSlice'
import { selectAuthState } from 'redux/slices/authSlice'
import ListItem from './ListItem'
import { AppDispatch } from 'redux/store'
import { useEffect } from 'react'

const BookList = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllBooks())
  }, [dispatch])

  const bookIds = useSelector(selectFilteredBookIds)
  const { isLogin } = useSelector(selectAuthState)

  const bookItems = bookIds.map((bookId) => (
    <ListItem key={bookId} id={bookId} isLogin={isLogin} />
  ))

  return (
    <div className="w-full lg:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 p-8 gap-4">
      {bookItems}
    </div>
  )
}

export default BookList
