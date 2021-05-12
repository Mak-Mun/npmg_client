import Link from 'next/link'

function AuthLayout({ children }) {
  return (
    <section className="flex flex-col font-sans bg-primaryWhite h-screen  w-screen   justify-center items-center ">
      <h1 className="font-bold text-5xl block font-sourceSans text-motherGreen text-center mb-10">
        <Link href="/">
          <a>NPMG</a>
        </Link>
      </h1>
      {children}
    </section>
  )
}

export default AuthLayout
