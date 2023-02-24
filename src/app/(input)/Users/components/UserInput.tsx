'use client'
import { useState } from 'react'

export default function UserInput(props: any) {
  const [enteredName, setName] = useState('')
  const [enteredAge, setAge] = useState('')

  const addUserHandler = (event: any) => {
    event.preventDefault()
    props.onAddUser(enteredName, Number(enteredAge))
  }
  const handleChangeName = (event: any) => {
    setName(event.target.value)
  }

  const handleChangeAge = (event: any) => {
    setAge(event.target.value)
  }

  return (
    <div className="relative mx-auto rounded-lg bg-pink-100 p-4 text-left leading-7 text-gray-600 sm:max-w-xl sm:px-12">
      <form>
        <div>
          <label className="block font-bold">Username</label>
          <input
            type="text"
            value={enteredName}
            onChange={handleChangeName}
            placeholder="Enter username or Email "
            className="h-5 w-full rounded-md border-2 border-slate-400 bg-slate-300 py-5
          px-2 text-black  focus:border-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
          />
        </div>
        <div>
          <label className="mt-4 block font-bold">Age(Years)</label>
          <input
            type="number"
            value={enteredAge}
            onChange={handleChangeAge}
            placeholder="Enter age"
            className="h-10 w-2/4 rounded-md border-2 border-slate-400 bg-slate-300
        px-2 text-black  focus:border-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
          />
        </div>
        <button
          type="submit"
          className="mt-4 h-10 rounded-md bg-violet-500 px-4 text-white"
          onClick={addUserHandler}
        >
          {'Add User'}
        </button>
        <div className="px-60"></div>
      </form>
    </div>
  )
}
