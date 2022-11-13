import { useSelector } from 'react-redux'
import { selectAuthState } from 'redux/slices/authSlice'

import BorrowedHistory from './BorrowedHistory'

const UserInfo = () => {

  const { isLogin, userInfo } = useSelector(selectAuthState)

  if (!isLogin) {
    return (
      <div className="w-full max-w-[1300px] min-h-screen h-full mx-auto p-8">
        <h1>Please Login first</h1>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1300px] min-h-screen h-full mx-auto p-8">
      <h1 className="py-4">This is profile info</h1>
      <ul>
        <li>Email: {userInfo.email}</li>
        <li>Display Name: {userInfo.displayName}</li>
        <li>Status: {userInfo.status}</li>
        <li>Privilege: {userInfo.role}</li>
      </ul>
      <BorrowedHistory />
    </div>
  )
}

export default UserInfo
