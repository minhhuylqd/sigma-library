import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sticky top-[64px] left-0 w-[200px] h-[92vh] z-[999] bg-slate-100'>
      <div className='flex flex-col px-2 py-4'>
        <Link to="/admin">
          <div className="px-4 py-2 rounded-xl hover:text-light-gold-6 hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary">
            <h1>Dashboard</h1>
          </div>
        </Link>
        <Link to="/admin/books">
          <div className="px-4 py-2 rounded-xl hover:text-light-gold-6 hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary">
            <h1>Books</h1>
          </div>
        </Link>
        <Link to="/admin/authors">
          <div className="px-4 py-2 rounded-xl hover:text-light-gold-6 hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary">
            <h1>Authors</h1>
          </div>
        </Link>
        <Link to="/admin/users">
          <div className="px-4 py-2 rounded-xl hover:text-light-gold-6 hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary">
            <h1>Users</h1>
          </div>
        </Link>
        <Link to="/admin/borrower">
          <div className="px-4 py-2 rounded-xl hover:text-light-gold-6 hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary">
            <h1>Borrower</h1>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar