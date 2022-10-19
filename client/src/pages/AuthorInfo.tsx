import AuthorProfile from 'components/AuthorProfile'
import Navbar from 'components/Navbar'
import React from 'react'
import { useParams } from 'react-router-dom'

const AuthorInfo = () => {

  const authorId = useParams().authorId!

  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <AuthorProfile authorId={authorId} />
    </div>
  )
}

export default AuthorInfo