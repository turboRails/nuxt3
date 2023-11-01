import Image from 'next/image'
import { FaBeer } from 'react-icons/fa'
import './page.css'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center ">
    <main className="flex min-h-screen max-w-screen-2xl flex-col border px-8 md:px-16">
      <header className="py-8">
        <a href="#">
          <Image
            src="/next.svg"
            alt=""
            className="h-7 invert"
            width={200}
            height={200}
          />
        </a>
      </header>
      <section className="flex flex-col gap-20  py-12 md:py-20 lg:flex-row">
        <section className="flex-1">
          <h1 className="text-6xl leading-tight text-slate-200">
            {' '}
            Join us at the biggest FrontConf
          </h1>
          <p className="my-2 text-xl text-violet-500"> July 2023 - BeerHall </p>
          <p className="mt-4 text-lg text-gray-400">
            {' '}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reiciendis, voluptatibus quibusdam. Incidunt illo neque suscipit
            vitae nobis mollitia.
          </p>
        </section>

        <section className="max-w-lg">
          <div className="rounded-lg shadow-lg shadow-purple-200">
            <div className="rounded-t-lg bg-violet-400 p-8 text-yellow-800">
              <FaBeer className="h-12 w-12" />
            </div>
            <div className="rounded-b-lg bg-white p-10 text-black">
              <p>Get notified of beer arrival</p>
              <form
                action=""
                className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-0"
              >
                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  className="border-1 flex-grow rounded-md border-violet-500 px-3 py-2 hover:border-2 focus:border-4 focus:outline-none sm:rounded-r-none"
                />
                <button className="rounded-md bg-violet-500 p-2 text-white sm:rounded-l-none">
                  Notify me{' '}
                </button>
              </form>
            </div>
          </div>
        </section>
      </section>
      <footer className="my-8 mt-auto">
        <ul className="flex gap-6 text-sm text-white lg:text-slate-400">
          <li>
            <a href="#"> About us</a>
          </li>
          <li>
            <a href="#"> Contact </a>
          </li>
          <li>
            <a href="#"> Privacy Policy </a>
          </li>
        </ul>
      </footer>
    </main>
    </div>
  )
}
