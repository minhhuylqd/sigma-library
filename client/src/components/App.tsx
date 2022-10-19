import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import Books from 'pages/Books'
import BookInfo from 'pages/BookInfo'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import User from 'pages/User'
import Admin from 'pages/Admin'
import AuthorInfo from 'pages/AuthorInfo'
import AdminAuthors from 'pages/AdminManagement/AdminAuthors'
import AdminBooks from 'pages/AdminManagement/AdminBooks'
import AdminBorrower from 'pages/AdminManagement/AdminBorrower'
import AdminUsers from 'pages/AdminManagement/AdminUsers'

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
        <Route path="/admin/authors" element={<AdminAuthors />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/borrower" element={<AdminBorrower />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
