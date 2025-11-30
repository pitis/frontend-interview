'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'
import type { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/',
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloNextAppProvider makeClient={makeClient}>
        {children}
      </ApolloNextAppProvider>
    </QueryClientProvider>
  )
}
