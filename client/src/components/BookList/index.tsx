import { useSelector } from 'react-redux'

import { selectAllBookIds, selectFilteredBookIds } from 'redux/slices/booksSlice'
import ListItem from './ListItem'

const BookList = () => {
  const bookIds = useSelector(selectFilteredBookIds)

  const bookItems = bookIds.map((bookId) => (
    <ListItem key={bookId} id={bookId} />
  ))

  return (
    <div className='w-full max-w-[1000px] grid grid-cols-1 p-8 gap-4'>
      {bookItems}
    </div>
  )
}

export default BookList
