import { createClient } from "@urql/core"

const getToken = () => localStorage.getItem("AUTH_TOKEN")

export const client = createClient({
  url: "https://npmg-server.herokuapp.com/graphql",
  fetchOptions: () => {
    const token = getToken()
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    }
  },
})
