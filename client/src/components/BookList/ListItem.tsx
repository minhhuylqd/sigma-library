import { useSelector } from 'react-redux'

import { selectBookById } from 'redux/slices/booksSlice'
import { RootState } from 'redux/store'

type Item = {
  id: string
}

const ListItem = ({ id }: Item) => {
  const book = useSelector((state: RootState) => selectBookById(state, id))

  return (
    <ul>
      <li>Book ID: {book._id}</li>
      <li>Title: {book.title}</li>
      <li>ISBN: {book.isbn}</li>
      <li>Available Copies: {book.availableCopies}</li>
      <li>Authors: {book.authorNames.map((author) => <span key={author}>{author}, </span>)}</li>
    </ul>
  )
}

export default ListItem
