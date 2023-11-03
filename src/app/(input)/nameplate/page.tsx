
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center antialiased sm:py-12">
      <div className="absolute inset-0 bg-[url(/img/endless-constellation.svg)] bg-center"></div>
      <div className="relative mx-auto py-3 text-center sm:max-w-xl text-slate-300">
        <span className="text-2xl font-light">Enter here</span>
        <div className="relative rounded-lg  p-8 shadow-xl shadow-cyan-500  sm:max-w-xl sm:px-12">
          <div className="relative mt-4 shadow-md sm:rounded-lg">
            <div className="h-2 rounded-t-md bg-fuchsia-800"></div>
            <div className="space-y-6 bg-pink-200 py-8 px-2 text-base leading-7 text-gray-600">
              <div className="divide-y divide-gray-800/50">
                <span className="text-2xl font-light">Welcome to</span>
                <div>
                  <span className="text-2xl font-light">Celestial Palace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
