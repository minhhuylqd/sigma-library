import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { adminSelectBorrowerEntities, adminSelectUserEntities, adminSelectUserIds, fetchAllUsersThunk } from "redux/slices/adminSlice"
import { AppDispatch } from "redux/store"
import UserItem from "./UserItem"

const UserDashboard = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchAllUsersThunk())
  }, [dispatch])

  const userIds = useSelector(adminSelectUserIds)

  const userEntities = useSelector(adminSelectUserEntities)  
  const borrowerEntities = useSelector(adminSelectBorrowerEntities)

  return (
    <div className="w-full h-full p-8 overflow-x-auto">
      <h1 className="inline-block mb-8 text-2xl border-b-4 border-light-gold-6">
        User Management
      </h1>
      <table className="table-auto text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="py-3 px-6">
              Email
            </th>
            <th className="py-3 px-6">
              Display Name
            </th>
            <th className="py-3 px-6">
              Status
            </th>
            <th className="py-3 px-6">
              Role
            </th>
            <th className="py-3 px-6">
              Late Return?
            </th>
            <th className="py-3 px-6">
              Ban
            </th>
            <th className="py-3 px-6">
            </th>
          </tr>
        </thead>
        <tbody>
          {
            userIds.map((userId) => (
              <UserItem key={userId} userId={userId} userEntities={userEntities} borrowerEntities={borrowerEntities} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserDashboard