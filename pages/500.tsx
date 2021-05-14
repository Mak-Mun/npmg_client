import Link from 'next/link'

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1>500 | Internal server error</h1>
      <Link href="/">
        <a className="block text-blue-600 font-bold">Back to home</a>
      </Link>
    </div>
  )
}

export default NotFound
