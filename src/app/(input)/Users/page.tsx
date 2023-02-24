import UserList from "./components/UserList"

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center antialiased sm:py-12">
      <div className="absolute inset-0 bg-[url(/img/endless-constellation.svg)] bg-center"></div>
      <UserList />
    </div>
  )
}

export default Home
