import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from "@urql/core"
// import { ssrExchange } from "@urql/svelte"

const getToken = () => localStorage.getItem("AUTH_TOKEN")

//TODO: (verite) :setup ssr with sapper
// export const ssr = ssrExchange({
//   isClient: typeof window !== "undefined",
//   initialState:
//     typeof window === "undefined" ? undefined : window.__SAPPER__.preloaded,
// })

export const client = createClient({
  //http://localhost:8800/graphql
  //https://npmg-server.herokuapp.com/graphql
  url: "http://localhost:8800/graphql",
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})

export default client

//TODO: (verite): handle authentication
//   fetchOptions: () => {
//     const token = getToken()
//     return {
//       headers: { authorization: token ? `Bearer ${token}` : "" },
//     }
//   },
