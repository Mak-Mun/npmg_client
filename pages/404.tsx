import Link from 'next/link'

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1>404 | Not found</h1>
      <p>
        {' '}
        <Link href="/">
          <a className="block text-blue-600 font-bold">Back to home</a>
        </Link>
      </p>
    </div>
  )
}

export default NotFound
