import { gql, useQuery } from '@apollo/client'

const CURRENT_USER_QUERY = gql`
  query getcurrent_user {
    me {
      id
      email
      firstName
      role
      lastName
      createdAt
    }
  }
`

function useUser() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY)
  return { data, loading, error }
}

export { CURRENT_USER_QUERY, useUser }
