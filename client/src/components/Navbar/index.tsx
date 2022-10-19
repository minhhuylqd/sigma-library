import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch } from 'redux/store'
import { logout, selectAuthState } from 'redux/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { isLogin, isActive, isAdmin } = useSelector(selectAuthState)

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('authToken')
  }

  const logoutAndProfile = (
    <div className="flex items-center px-4">
      <Link to="/user">
        <div className="p-4 hover:text-light-gold-6 hover:bg-light-gold-1 hover:border-b-2 hover:border-light-gold-6">
          <h1>Profile</h1>
        </div>
      </Link>
      <Link to="/">
        <button
          className="p-4 hover:text-light-gold-6 hover:bg-light-gold-1 hover:border-b-2 hover:border-light-gold-6"
          onClick={handleLogout}
        >
          <h1>Logout</h1>
        </button>
      </Link>
    </div>
  )

  const loginAndSignup = (
    <div className="flex items-center px-4">
      <Link to="/login">
        <div className="p-4 hover:text-light-gold-6 hover:bg-light-gold-1 hover:border-b-2 hover:border-light-gold-6">
          <h1>Login</h1>
        </div>
      </Link>
      <Link to="/signup">
        <div className="p-4 hover:text-light-gold-6 hover:bg-light-gold-1 hover:border-b-2 hover:border-light-gold-6">
          <h1>Signup</h1>
        </div>
      </Link>
    </div>
  )

  const adminLink = (
    <Link to="/admin">
      <div className="px-6 py-4 rounded-3xl hover:text-light-gold-6 hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary">
        <h1 className="">LIBRARY MANAGEMENT</h1>
      </div>
    </Link>
  )

  return (
    <nav className="sticky top-0 w-full h-[64px] z-[1000] flex justify-between items-center bg-light-primary rounded-b-lg border-b">
      <div className="flex items-center">
        <Link to="/">
          <div className="py-4 px-8 bg-light-gold-1">
            <h1 className="text-lg font-bold">THE <span className='text-light-gold-6'>Σ</span> LIBRARY</h1>
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/books">
          <div className="px-6 py-4 rounded-3xl hover:text-light-gold-6 hover:bg-light-gold-1 active:bg-light-gold-6 active:text-light-primary">
            <h1 className="font-semibold">BROWSE BOOK</h1>
          </div>
        </Link>
        {isActive && isAdmin && adminLink}
      </div>
      <div>{isLogin ? logoutAndProfile : loginAndSignup}</div>
    </nav>
  )
}

export default Navbar
