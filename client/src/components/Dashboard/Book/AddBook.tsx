import {useState} from 'react'
import AddBookForm from './AddBookForm'

const AddBook = () => {


  const [isAddOpen, setAddOpen] = useState(false)

  const toggleAddOpen = () => setAddOpen(prevState => !prevState)



  return (
    <div>
      <button 
        className='mb-4 text-sm px-3 py-1 border-2 border-light-gold-6 rounded-2xl hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary'
        onClick={() => setAddOpen(true)}
      >
        Add Book
      </button>
      <AddBookForm isOpen={isAddOpen} toggleIsOpen={toggleAddOpen} />
    </div>
  )
}

export default AddBook