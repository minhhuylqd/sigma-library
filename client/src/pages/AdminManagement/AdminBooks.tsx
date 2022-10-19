import BookDashboard from 'components/Dashboard/Book'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

const AdminBooks = () => {
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