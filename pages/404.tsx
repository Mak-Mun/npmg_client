import Link from 'next/link'

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-5xl font-semibold">404 | Not found</h1>
      <p className="flex">
        {' '}
        <p className="text-sm mt-1 mr-1">Went missing?</p>
        <Link href="/">
          <a className="block text-green-600 font-bold text-xl">Back to home</a>
        </Link>
      </p>
    </div>
  )
}

export default NotFound
