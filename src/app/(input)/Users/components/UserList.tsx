'use client'
import UserInput from './UserInput'
import User from './User'
import { useState } from 'react'

const UserList = () => {
  const [userList, setuserList] = useState<{ name: string; age: number }[]>([])

  const listItems = userList.map(
    (user: { name: string; age: number }, index) => (
      <li key={index}>
        <User name={user.name} age={user.age} />
      </li>
    )
  )

  const addUser = (name: string, age: number) => {
    setuserList((prevList) => {
      const updatedGoals = [{ name, age }, ...prevList]
      return updatedGoals
    })
  }

  return (
    <div>
      <UserInput onAddUser={addUser} />

      <div className="relative mx-auto mt-10 rounded-lg bg-pink-100  px-4 py-10 text-left leading-7 text-gray-600 sm:max-w-xl sm:px-12">
        <ul>{listItems}</ul>
        <div className="px-60"></div>
      </div>
    </div>
  )
}
export default UserList
