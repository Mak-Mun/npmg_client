import { gql } from "@urql/svelte"
export const GET_RANGERS = gql`
query userofRangerTypes{
    userofRangerTypes{
        lastName
        dob
        email
        firstName
    }
}
`