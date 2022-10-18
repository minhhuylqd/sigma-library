import Navbar from 'components/Navbar'
import UserInfo from 'components/UserInfo'

const User = () => {
  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      <UserInfo />
    </div>
  )
}

export default User
