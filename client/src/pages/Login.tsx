import { useSelector } from 'react-redux'

import LoginForm from 'components/LoginForm'
import Navbar from 'components/Navbar'
import LoginSucess from 'components/LoginSuccess'
import { selectAuthState } from 'redux/slices/authSlice'

const Login = () => {
  const { isLogin } = useSelector(selectAuthState)

  return (
    <div className="w-full min-h-screen relative bg-light-primary text-black">
      <Navbar />
      {isLogin ? <LoginSucess /> : <LoginForm />}
    </div>
  )
}

export default Login
