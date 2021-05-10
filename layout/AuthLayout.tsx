import Link from 'next/link'
import React from 'react'

function AuthLayout({ children }) {
  return (
    <section className="bg-primaryWhite h-screen  w-screen flex  justify-center items-center flex-col">
      <div className="font-bold text-9xl block font-sourceSans text-motherGreen text-center mb-10">
        <Link href="/">
          <a>NPMG</a>
        </Link>
      </div>

      {children}
    </section>
  )
}

export default AuthLayout
