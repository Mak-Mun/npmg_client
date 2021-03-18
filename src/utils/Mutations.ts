import { gql } from "@urql/svelte"

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: SingUpUserInput!) {
    signup(data: $createUserInput) {
      id
      email
    }
  }
`
