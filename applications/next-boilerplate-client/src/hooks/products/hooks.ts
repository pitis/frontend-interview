import { gql, useQuery } from '@apollo/client'
import type { Product } from './types'

const PRODUCTS_QUERY = gql`
  query Products($searchTerm: String, $first: Int) {
    products(searchTerm: $searchTerm, first: $first) {
      nodes {
        id
        name
        imageUrl
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export function useProducts(searchTerm: string) {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: {
      searchTerm: searchTerm || undefined,
      first: 20,
    },
  })

  return {
    data: (data?.products?.nodes || []) as Product[],
    isLoading: loading,
    error,
  }
}
