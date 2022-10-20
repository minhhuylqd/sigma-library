import axios from 'axios'

import { BorrowedHistory, User } from 'utils/types'
import { BACKEND_URL } from 'utils/configs'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import { fetchAllUsersThunk } from 'redux/slices/adminSlice'

const UserItem = ({userId, userEntities, borrowerEntities}: {
  userId: string,
  userEntities: {
    [userId: string]: User
  },
  borrowerEntities: {
    [borrowerId: string]: BorrowedHistory
  }
}) => {

  const dispatch = useDispatch<AppDispatch>()

  const user = userEntities[userId]

  const token = localStorage.getItem('authToken')

  const lateReturn = Object.values(borrowerEntities).find(
    (borrower) => (
      borrower.userId === user._id
      && !borrower.returnedDate
      && new Date(borrower.dueDate).getTime() < new Date(Date.now()).getTime()
    )
  )

  const handleBan = async () => {
    try {
      await axios.put(`${BACKEND_URL}/users/${user._id}`,
      {
        status: 'BANNED'
      },
      {headers: {
        Authorization: `Bearer ${token}`,
      }})
      dispatch(fetchAllUsersThunk())
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/users/${user._id}`,
      {headers: {
        Authorization: `Bearer ${token}`,
      }})
      dispatch(fetchAllUsersThunk())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {user.email}
      </th>
      <td className="py-4 px-6">
        {user.displayName}
      </td>
      <td className="py-4 px-6">
        {user.status}
      </td>
      <td className="py-4 px-6">
        {user.role}
      </td>
      <td className="py-4 px-6">
        {lateReturn ? 'true' : 'false'}
      </td>
      <td className="py-4 px-6">
        <button 
          className='italic hover:underline hover:text-light-gold-6'
          onClick={handleBan}
        >
          Ban
        </button>
      </td>
      <td className="py-4 px-6">
        <button 
          className='italic hover:underline hover:text-light-gold-6'
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default UserItem