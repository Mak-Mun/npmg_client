import { useRouter } from 'next/router'
import React from 'react'
import { useUser } from '../lib/useUser'

function Protectedayout({ children }) {
  const { data, loading, error } = useUser()

  const router = useRouter()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{JSON.stringify(error)}</p>
  }

  if (!data && !loading) {
    router.push('/signin')
  }

  return <div>{children}</div>
}

export default Protectedayout
