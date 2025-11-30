import { gql, useQuery } from '@apollo/client'
import type { Purchase } from './types'

const PURCHASES_QUERY = gql`
  query Purchases(
    $productIds: [ID]
    $userIds: [ID]
    $first: Int
    $after: String
  ) {
    purchases(
      productIds: $productIds
      userIds: $userIds
      first: $first
      after: $after
    ) {
      nodes {
        id
        date
        user {
          id
          firstName
          lastName
          profilePictureUrl
          email
        }
        product {
          id
          name
          imageUrl
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export function usePurchases(productIds: string[], userIds: string[]) {
  const { data, loading, error } = useQuery(PURCHASES_QUERY, {
    variables: {
      productIds: productIds.length > 0 ? productIds : undefined,
      userIds: userIds.length > 0 ? userIds : undefined,
      first: 20,
    },
  })

  return {
    data: {
      pages: [
        {
          purchases: (data?.purchases?.nodes || []) as Purchase[],
          pageInfo: data?.purchases?.pageInfo,
        },
      ],
    },
    isLoading: loading,
    hasNextPage: data?.purchases?.pageInfo?.hasNextPage || false,
    fetchNextPage: () => {},
    error,
  }
}
