import Navbar from 'components/Navbar'
import FilterBar from 'components/FilterBar'
import BookList from 'components/BookList'

const Books = () => {
  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <FilterBar />
      <BookList />
    </div>
  )
}

export default Books
