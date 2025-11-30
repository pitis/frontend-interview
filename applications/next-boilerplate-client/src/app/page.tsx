'use client'

import { useState, useMemo } from 'react'
import { MultiSelect } from '@/app/components/MultiSelect'
import type { MultiSelectItem } from '@/app/components/MultiSelect'
import { PurchasesList } from '@/app/components/PurchasesList'
import { Card } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { useProducts } from '@/app/hooks/products/hooks'
import { useUsers } from '@/app/hooks/users/hooks'
import { usePurchases } from '@/app/hooks/purchases/hooks'

export default function PurchasesPage() {
  const [productSearch] = useState('')
  const [userSearch] = useState('')
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useProducts(productSearch)

  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useUsers(userSearch)

  const {
    data: purchases,
    isLoading: purchasesLoading,
    hasNextPage,
    fetchNextPage,
    error: purchasesError,
  } = usePurchases(selectedProductIds, selectedUserIds)

  console.log(purchases, users, products)

  const error = productsError || usersError || purchasesError

  const productItems: MultiSelectItem[] = useMemo(
    () => products.map((p) => ({ id: p.id, label: p.name })),
    [products],
  )

  const userItems: MultiSelectItem[] = useMemo(
    () =>
      users.map((u) => ({
        id: u.id,
        label: `${u.firstName} ${u.lastName}`,
      })),
    [users],
  )

  const handleClearFilters = () => {
    setSelectedProductIds([])
    setSelectedUserIds([])
  }

  const handleNextPage = () => {
    fetchNextPage()
  }

  const selectedProductCount = selectedProductIds.length
  const selectedUserCount = selectedUserIds.length

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Purchases
          </h1>
          <p className="text-muted-foreground mt-2">
            Filter purchases by products and users to see transaction details
          </p>
        </div>

        {error && (
          <Card className="p-4 bg-destructive/10 border-destructive/50">
            <p className="text-sm text-destructive">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </Card>
        )}

        <Card className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="products-select"
                  className="text-sm font-medium text-foreground mb-2 block"
                >
                  Products
                </label>
                <div id="products-select">
                  {productsLoading ? (
                    <div className="border rounded-md p-2 text-sm text-muted-foreground">
                      Loading products...
                    </div>
                  ) : (
                    <MultiSelect
                      items={productItems}
                      value={selectedProductIds}
                      onChange={setSelectedProductIds}
                      placeholder="Select Products"
                      searchPlaceholder="Search products..."
                    />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="users-select"
                  className="text-sm font-medium text-foreground mb-2 block"
                >
                  Users
                </label>
                <div id="users-select">
                  {usersLoading ? (
                    <div className="border rounded-md p-2 text-sm text-muted-foreground">
                      Loading users...
                    </div>
                  ) : (
                    <MultiSelect
                      items={userItems}
                      value={selectedUserIds}
                      onChange={setSelectedUserIds}
                      placeholder="Select Users"
                      searchPlaceholder="Search users..."
                    />
                  )}
                </div>
              </div>
            </div>

            {(selectedProductCount > 0 || selectedUserCount > 0) && (
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </Card>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Results {!purchasesLoading && `(${purchases.length})`}
          </h2>
          <PurchasesList
            purchases={purchases}
            isLoading={purchasesLoading}
            hasNextPage={hasNextPage || false}
            onNextPage={handleNextPage}
          />
        </div>
      </div>
    </main>
  )
}
