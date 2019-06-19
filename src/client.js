import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import wxApolloFetcher from 'wx-apollo-fetcher'
import { setApolloClient } from 'taro-apollo'

import { uri } from './config'

const client = new ApolloClient({
    link: new HttpLink({
        uri,
        fetch: wxApolloFetcher,
    }),
    cache: new InMemoryCache()
})
setApolloClient(client)

export default client
