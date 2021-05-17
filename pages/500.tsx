import Link from 'next/link'
import Head from 'next/head'

function InternalServerError() {
  return (
    <>
    <Head>
    <title>Internal Server Error</title>
  </Head>
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-5xl font-semibold">500 | Internal server error</h1>
      <p className="flex">
        <p className="text-sm mt-1 mr-1">Sorry,</p>
      <Link href="/">
        <a className="block text-green-600 font-bold text-xl">Back to home</a>
      </Link>
      </p>
    </div>
    </>
  )
}

export default InternalServerError
