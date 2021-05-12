import Head from 'next/head'
import { Fragment } from 'react'
import AuthLayout from '../layout/AuthLayout'

export const signin = () => {
  return (
    <Fragment>
      <Head>
        <title>signin</title>
      </Head>
      <AuthLayout>
        <form className="grid grid-cols-1 gap-6">
          <label htmlFor="email" className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              required
              className="block bg-transparent  focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
            />
          </label>

          <label htmlFor="password" className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              id="password"
              className="block bg-transparent focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
              required
            />
          </label>

          <div className="flex justify-between mt-4 mb-2">
            <div>
              <label
                htmlFor="remember"
                className="inline-flex items-center flex-row"
              >
                <input
                  type="checkbox"
                  className="border-gray-300 border-2 rounded text-green-600 focus:border-gray-300 focus:ring-green-500 "
                  name="remberme"
                  id="remember"
                />
              </label>
              Remember me?
            </div>

            <a href="/reset-password" className=" text-blue-500">
              {' '}
              Forgot password?{' '}
            </a>
          </div>

          <input
            type="submit"
            value="Login here"
            className="bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-3 "
          />

          <div className="text-center">
            <span>Don't have an account</span>
            <a href="/signup" className=" text-blue-500">
              {' '}
              Register here?{' '}
            </a>
          </div>
        </form>{' '}
      </AuthLayout>
    </Fragment>
  )
}
export default signin
