import Head from 'next/head'
import Link from 'next/link'
import React, { Fragment } from 'react'

function AuthLayout({ children }) {
  return (
    <Fragment>
      <Head>
        <title>Siginup</title>
      </Head>
      <section
        style={{ flexDirection: 'column' }}
        className="flex flex-row bg-primaryWhite h-screen  w-screen   justify-center items-center "
      >
        <h1 className="font-bold text-9xl block font-sourceSans text-motherGreen text-center mb-10">
          <Link href="/">
            <a>NPMG</a>
          </Link>
        </h1>
        {children}
      </section>
    </Fragment>
  )
}

export default AuthLayout
