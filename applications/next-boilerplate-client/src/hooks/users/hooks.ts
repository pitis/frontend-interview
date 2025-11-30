import { gql, useQuery } from '@apollo/client'
import type { User } from './types'

const USERS_QUERY = gql`
  query Users($searchTerm: String, $first: Int) {
    users(searchTerm: $searchTerm, first: $first) {
      nodes {
        id
        firstName
        lastName
        profilePictureUrl
        email
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export function useUsers(searchTerm: string) {
  const { data, loading, error } = useQuery(USERS_QUERY, {
    variables: {
      searchTerm: searchTerm || undefined,
      first: 20,
    },
  })

  return {
    data: (data?.users?.nodes || []) as User[],
    isLoading: loading,
    error,
  }
}
