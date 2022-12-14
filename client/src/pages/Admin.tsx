import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'

import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { useEffect } from 'react'
import { fetchAllAuthorsThunk, fetchAllBooksThunk, fetchAllBorrowerThunk, fetchAllUsersThunk } from 'redux/slices/adminSlice'

const Admin = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchAllBooksThunk())
    dispatch(fetchAllAuthorsThunk())
    dispatch(fetchAllUsersThunk())
    dispatch(fetchAllBorrowerThunk())
  }, [dispatch])

  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <div className='flex'>
        <Sidebar /> 
        <div className='w-[100%-200px] h-full'>
          <div className="w-full h-full p-8 overflow-x-auto">
            <h1 className="inline-block mb-8 text-2xl border-b-4 border-light-gold-6">
              Library Management
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
