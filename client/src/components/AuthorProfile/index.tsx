import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAuthorsThunk, selectAuthorById } from 'redux/slices/authorsSlice'
import { AppDispatch, RootState } from 'redux/store'

const AuthorProfile = ({authorId}: {authorId: string}) => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllAuthorsThunk())
  }, [dispatch])

  const author = useSelector((state: RootState) => selectAuthorById(state, authorId))

  return (
    <div>
      <h1>{author.name}</h1>
    </div>
  )
}

export default AuthorProfile