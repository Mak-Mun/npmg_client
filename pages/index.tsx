import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>NPMG </title>
      </Head>
      <main className="bg-landing bg-opacity-0 h-screen bg-cover">
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50">
          <div className="flex justify-center items-center h-screen gap-5">
            <div className="w-1/2 sm:w-11/12 md:w-1/2">
              <div className="text-white mb-12 font-bold text-4xl outline-none capitalize">
                <h1>
                  Instant report managment Platform for Gorilla Mountains, and
                  Every thing that goes with it.
                </h1>
              </div>
              <Link href="/signin">
                <a className="bg-primaryGreen px-8 py-3 text-white rounded">
                  Join here
                </a>
              </Link>
            </div>
          </div>
          <footer className="w-full text-base fixed bottom-2 font-bold text-white text-center">
            <p>npmg Dev Team | &copy;2020</p>
          </footer>
        </div>
      </main>
    </Fragment>
  )
}
