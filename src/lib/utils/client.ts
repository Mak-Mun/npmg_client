//configurations for urql

import { createClient } from "@urql/svelte"

export const client = createClient({
    url:"https://npmg-server.herokuapp.com/graphql",
    fetchOptions: () => {
        const token  = ''
        return {
            headers: { authorization: token ? `Bearer ${token}` : ''}
        }
    }
})
