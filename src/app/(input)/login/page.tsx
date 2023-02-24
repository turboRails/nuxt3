import React, { FC } from 'react'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center antialiased sm:py-12">
      <div className="absolute inset-0 bg-[url(/img/endless-constellation.svg)] bg-center"></div>
      <div className="relative mx-auto py-3 text-center text-slate-300 sm:max-w-xl">
        <span className="text-2xl font-light">Login to your account</span>
        <div className="relative rounded-lg  p-8 shadow-xl shadow-cyan-500  sm:max-w-xl sm:px-16">
          <div className="h-2 rounded-t-md bg-fuchsia-800"></div>
          <div className="space-y-6 bg-pink-100 py-8 px-16 text-left text-base leading-7 text-gray-800">
            <div>
              <label className="block font-semibold">Username or Email</label>
              <input
                type="text"
                placeholder="Enter username or Email "
                className="h-5 w-full rounded-md border-2  bg-pink-50 py-5 focus:outline-none focus:ring-1 focus:ring-fuchsia-600 focus:border-3 focus:border-pink-300"
              />
            </div>
            <div>
              <label className="mt-4 block font-semibold">Password </label>
              <input
                type="password"
                placeholder="Enter password"
                className="h-5 w-full rounded-md border-2  bg-pink-50 py-5 hover:outline-none focus:outline-none focus:ring-1 focus:ring-fuchsia-600"
              />
            </div>
            <div className="mt-12 divide-y divide-gray-800/50">
              <div></div>
              <div className="flex items-baseline justify-between">
                <button className="mt-4 rounded-lg bg-fuchsia-800 px-6  text-white">
                  Login
                </button>
                <a href="#" className="ml-4 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
