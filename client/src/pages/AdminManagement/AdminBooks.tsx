import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchAllBooksThunk } from 'redux/slices/adminSlice'
import { AppDispatch } from 'redux/store'
import BookDashboard from 'components/Dashboard/Book'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

const AdminBooks = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchAllBooksThunk())
  }, [dispatch])

  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <div className='flex'>
        <Sidebar /> 
        <div className='w-[100%-200px] h-full'>
          <BookDashboard />
        </div>
      </div>
    </div>
  )
}

export default AdminBooks