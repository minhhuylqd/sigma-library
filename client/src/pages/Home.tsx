import Navbar from 'components/Navbar'

const Home = () => {
  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <div className='w-full h-[88vh] flex flex-col justify-center items-center gap-4'>
        <h2 className='text-4xl'>
          KNOWLEDGE = Σ(books + ...)
        </h2>
        <h3 className='text-xl'>
          AND THUS THE <span className='text-light-gold-6'>SIGMA</span> LIBRARY WAS FOUNDED!
        </h3>
      </div>
    </div>
  )
}

export default Home
