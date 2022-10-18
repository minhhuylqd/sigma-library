import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCredentialThunk } from 'redux/slices/authSlice'
import { AppDispatch } from 'redux/store'
import { BACKEND_URL } from 'utils/configs'

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const submitLogin = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        email: email,
        password: password,
      })
      if (response.status === 201) {
        const token = response.data.token
        localStorage.setItem('authToken', token)
        setStatus('Login Successfully')
      } else {
        setStatus('Login Failed')
      }
      dispatch(fetchCredentialThunk())
    } catch (error) {
      setStatus('Login Failed')
      console.log(error)
    }
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto p-8 flex flex-col items-center justify-center gap-2">
      <h2 className="p-4">Login</h2>
      {status !== '' && <i>{status}</i>}
      <div className="flex flex-col gap-4 w-full max-w-[750px]">
        <input
          type="email"
          id="email"
          className="border-2 rounded-md w-full p-2"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          id="password"
          className="border-2 rounded-md w-full p-2"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className="flex justify-center border-2 rounded-lg mx-auto py-1 px-4 border-light-gold-6 bg-light-gold-1 hover:bg-light-gold-6 hover:text-light-primary"
          onClick={submitLogin}
        >
          Submit
        </button>
      </div>
      <i>
        Don't have an account?{' '}
        <span className="text-light-gold-6 hover:underline cursor-pointer">
          <Link to="/signup">Sign up!</Link>
        </span>
      </i>
    </div>
  )
}

export default LoginForm
