import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import Books from 'pages/Books'
import BookInfo from 'pages/BookInfo'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import User from 'pages/User'
import Admin from 'pages/Admin'
import AuthorInfo from 'pages/AuthorInfo'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookInfo />} />

        <Route path="/authors/:authorId" element={<AuthorInfo />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/user" element={<User />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
