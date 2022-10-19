import BookProfile from 'components/BookProfile'
import Navbar from 'components/Navbar'
import React from 'react'
import { useParams } from 'react-router-dom'

const BookInfo = () => {

  const bookId = useParams().bookId!

  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <BookProfile bookId={bookId} />
    </div>
  )
}

export default BookInfo