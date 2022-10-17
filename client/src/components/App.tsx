import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import Book from 'pages/Book'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import User from 'pages/User'
import Admin from 'pages/Admin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
