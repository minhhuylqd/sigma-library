import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { adminSelectAuthorEntities, adminSelectBookEntities, adminSelectBookIds, fetchAllAuthorsThunk, fetchAllBooksThunk } from "redux/slices/adminSlice"
import { AppDispatch } from "redux/store"
import AddBook from "./AddBook"
import BookItem from "./BookItem"

const BookDashboard = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchAllBooksThunk())
    dispatch(fetchAllAuthorsThunk())
  }, [dispatch])

  const bookIds = useSelector(adminSelectBookIds)

  const bookEntities = useSelector(adminSelectBookEntities)
  const authorEntities = useSelector(adminSelectAuthorEntities)
  

  return (
    <div className="w-full h-full p-8 overflow-x-auto">
      <h1 className="inline-block mb-8 text-2xl border-b-4 border-light-gold-6">
        Books Management
      </h1>
      <AddBook />
      <table className="table-auto text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="py-3 px-6">
              Title
            </th>
            <th className="py-3 px-6">
              ISBN
            </th>
            <th className="py-3 px-6">
              Authors
            </th>
            <th className="py-3 px-6">
              Publisher
            </th>
            <th className="py-3 px-6">
              Copies
            </th>
            <th className="py-3 px-6">
            </th>
            <th className="py-3 px-6">
            </th>
          </tr>
        </thead>
        <tbody>
          {
            bookIds.map((bookId) => (
              <BookItem key={bookId} bookId={bookId} bookEntities={bookEntities} authorEntities={authorEntities} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default BookDashboard