import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'redux/store'
import { fetchAllUsersThunk } from 'redux/slices/adminSlice'
import UserDashboard from 'components/Dashboard/User'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

const AdminUsers = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchAllUsersThunk())
  }, [dispatch])

  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <div className='flex'>
        <Sidebar /> 
        <div className='w-[100%-200px] h-full'>
          <UserDashboard />
        </div>
      </div>
    </div>
  )
}

export default AdminUsers