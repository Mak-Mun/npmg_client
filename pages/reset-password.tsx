import React, { Fragment } from 'react'
import Link from 'next/link'
import AuthLayout from '../layout/AuthPageLayout'

export default function resetPassword() {
  return (
    <Fragment>
      <AuthLayout>
        <form className="grid grid-cols-1 gap-6">
          <label htmlFor="email" className="block mb-6">
            <span className="text-gray-700 mb-8">Email</span>
            <input
              type="email"
              id="email"
              placeholder="enter your email here"
              className="block  bg-transparent focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
            />
          </label>
          <input
            type="submit"
            value="Reset your password"
            className="bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-2"
          />

          <div className="text-center">
            <span>Remember your account</span>
            <Link href="/signin">
            <a  className=" text-blue-500">
              {' '}
              Login here?{' '}
            </a>
            </Link>
          </div>
        </form>{' '}
      </AuthLayout>
    </Fragment>
  )
}
