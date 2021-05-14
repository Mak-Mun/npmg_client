import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import AuthLayout from '../layout/AuthPageLayout'
import useForm from '../lib/useForm'

const SIGNIN_MUTATION = gql`
  mutation ($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`

export const Signin = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  })

  const [sign, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: { data: inputs },
    fetchPolicy: 'no-cache',
  })

  const router = useRouter()

  return (
    <Fragment>
      <Head>
        <title>signin</title>
      </Head>
      <AuthLayout>
        {error && <p className="text-red-500 font-bold">{error.message}</p>}
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            try {
              const { data } = await sign()

              localStorage.setItem('auth_token', data.login.token)

              resetForm()

              router.push('/dashboard')
            } catch (error) {
              console.log(error)
            }
          }}
          className="grid grid-cols-1 gap-6"
        >
          <label htmlFor="email" className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              required
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="block bg-transparent  focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
            />
          </label>

          <label htmlFor="password" className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
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
            disabled={loading}
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
export default Signin
