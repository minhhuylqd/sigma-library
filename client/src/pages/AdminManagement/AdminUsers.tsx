import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

const AdminUsers = () => {
  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <div className='flex'>
        <Sidebar /> 
        <div className='w-[100%-200px] h-full'>
          <h1>Users Management</h1>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers