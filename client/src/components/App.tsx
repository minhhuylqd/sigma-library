import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import Book from 'pages/Book'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
