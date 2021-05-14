import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import AuthLayout from '../layout/AuthPageLayout'
import useForm from '../lib/useForm'

const SIGNUP_MUTATION = gql`
  mutation ($data: SignUpUserInput!) {
    signup(data: $data) {
      id
    }
  }
`

export default function signup() {
  const { inputs, handleChange } = useForm({
    firstName: '',
    lastName: '',
    password: '',
    role: 'USER',
    email: '',
  })
  // phone: '',

  const router = useRouter()

  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: { data: inputs },
  })

  return (
    <Fragment>
      <Head>
        <title>signup</title>
      </Head>
      <AuthLayout>
        {error && <p className="text-red-500">{error.message}</p>}{' '}
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={async (e) => {
            e.preventDefault()
            try {
              const { data, errors } = await signup()
              console.log(data)
              console.log(errors)
              router.push('/signin')
            } catch (error) {
              console.log(error)
            }
          }}
        >
          <label htmlFor="First name" className="block">
            <span className="text-gray-700">Full name</span>
            <input
              type="text"
              id="First name"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
              placeholder="Boston Rockstack"
              className="block bg-transparent focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
              required
            />
          </label>

          <label htmlFor="LastName" className="block">
            <span className="text-gray-700">Last name</span>
            <input
              type="text"
              id="LastName"
              placeholder="Boston Rockstack"
              className="block bg-transparent focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
              required
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
            />
          </label>

          {/* <label htmlFor="phone" className="block">
            <span className="text-gray-700">Phone</span>
            <input
              type="text"
              id="phone"
              placeholder="2507147115"
              className="block bg-transparent focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
              required
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
          </label>
 */}
          <label htmlFor="email" className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              placeholder="test@gmail.com"
              className="block bg-transparent focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
              required
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password" className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              id="password"
              className="block bg-transparent focus:outline-none border-transparent  focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
              required
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="role" className="block">
            <span>Role</span>
            <select
              id="role"
              className="block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"
              required
              name="role"
              value={inputs.role}
              onChange={handleChange}
            >
              <option value="USER">USER</option>
              <option value="RANGER">RANGER</option>
              <option value="DOCTOR">DOCTOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>

          <input
            type="submit"
            value="Register here"
            className="bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-3 "
          />

          <div className="text-center">
            <span>Have an account</span>
            <a href="/signin" className=" text-blue-500">
              {' '}
              Login here?{' '}
            </a>
          </div>
        </form>
      </AuthLayout>
    </Fragment>
  )
}
