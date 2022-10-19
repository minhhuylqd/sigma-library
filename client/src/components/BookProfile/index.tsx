import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBooksThunk, selectBookById } from 'redux/slices/booksSlice'
import { AppDispatch, RootState } from 'redux/store'

const BookProfile = ({bookId}: {bookId: string}) => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllBooksThunk())
  }, [dispatch])

  const book = useSelector((state: RootState) => selectBookById(state, bookId))

  return (
    <div>
      <h1>{book.title}</h1>
    </div>
  )
}

export default BookProfile