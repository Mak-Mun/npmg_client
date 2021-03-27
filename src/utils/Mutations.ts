import { gql } from "@urql/svelte"

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: SingUpUserInput!) {
    signup(data: $createUserInput) {
      id
      email
    }
  }
`

export const NEW_NPMG = gql`
  mutation newNpmg($newNpmgInput: NewNpmg!) {
    newNpmg(data: $newNpmgInput) {
      id
      name
    }
  }
`

export const NEW_FAMILY = gql`
  mutation addNewFamily($newNpmgInput: NewFamily!) {
    addNewFamily(data: $newNpmgInput) {
      id
      family_name
    }
  }
`

export const NEW_REPORT = gql`
  mutation addNewFamily($newNpmgInput: NewReport!) {
    NewReport(data: $newNpmgInput) {
      id
      gorilla
    }
  }
`
