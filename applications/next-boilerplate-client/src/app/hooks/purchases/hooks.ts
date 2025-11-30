'use client'

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
  const { data, loading, error, fetchMore } = useQuery(PURCHASES_QUERY, {
    variables: {
      productIds: productIds.length > 0 ? productIds : undefined,
      userIds: userIds.length > 0 ? userIds : undefined,
      first: 30,
    },
    notifyOnNetworkStatusChange: true,
  })

  const purchases = data?.purchases?.nodes || []
  const hasNextPage = data?.purchases?.pageInfo?.hasNextPage || false
  const endCursor = data?.purchases?.pageInfo?.endCursor

  const handleFetchMore = () => {
    if (!hasNextPage || !endCursor) return

    fetchMore({
      variables: {
        after: endCursor,
        first: 30,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        return {
          purchases: {
            ...fetchMoreResult.purchases,
            nodes: [
              ...prev.purchases.nodes,
              ...fetchMoreResult.purchases.nodes,
            ],
          },
        }
      },
    })
  }

  return {
    data: purchases as Purchase[],
    isLoading: loading,
    hasNextPage,
    fetchNextPage: handleFetchMore,
    error,
  }
}
