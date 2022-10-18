import { useSelector } from 'react-redux'

import { selectBookById } from 'redux/slices/booksSlice'
import { RootState } from 'redux/store'

type Item = {
  id: string
  isLogin: boolean
}

const ListItem = ({ id, isLogin }: Item) => {
  const book = useSelector((state: RootState) => selectBookById(state, id))

  return (
    <ul>
      <li>Title: {book.title}</li>
      <li>ISBN: {book.isbn}</li>
      <li>Copies: {book.copies}</li>
      <li>
        Authors:{' '}
        {book.authorNames.map((author) => (
          <span key={author}>{author}, </span>
        ))}
      </li>
    </ul>
  )
}

export default ListItem
