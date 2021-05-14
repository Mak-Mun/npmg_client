import { useRouter } from 'next/router'
import React from 'react'
import { useUser } from '../lib/useUser'

function Protectedayout({ children }) {
  const { data, loading } = useUser()

  const router = useRouter()

  if (loading) {
    return <p>Loading...</p>
  }

  if (!data && !loading) {
    router.push('/signin')
    return null
  }

  return <div>{children}</div>
}

export default Protectedayout
