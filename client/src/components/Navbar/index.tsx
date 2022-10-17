import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full z-20 px-2 flex justify-between items-center bg-light-primary rounded-b-lg border-b">
      <div className="flex items-center gap-4">
        <Link to="/">
          <div className="p-4 hover:text-light-gold-6 hover:bg-light-gold-1 hover:border-b-2 hover:border-light-gold-6">
            <h1 className="text-lg font-bold">THE SIGMA LIBRARY</h1>
          </div>
        </Link>
        <Link to="/book">
          <div className="p-4 hover:text-light-gold-6 hover:bg-light-gold-1 hover:border-b-2 hover:border-light-gold-6">
            <h1 className="font-semibold">BROWSE BOOK</h1>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
