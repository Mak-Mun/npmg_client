import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/useApollo'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps)

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
