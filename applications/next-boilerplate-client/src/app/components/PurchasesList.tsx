import { Card } from './ui/card'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import type { Purchase } from '@/app/hooks/purchases/types'
import PurchaseCard from './PurchaseCard'

interface PurchasesListProps {
  purchases: Purchase[]
  isLoading: boolean
  hasNextPage: boolean
  onNextPage: () => void
}

export function PurchasesList({
  purchases,
  isLoading,
  hasNextPage,
  onNextPage,
}: Readonly<PurchasesListProps>) {
  if (isLoading && purchases.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          No purchases found. Try adjusting your filters.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {purchases.map((purchase) => (
          <PurchaseCard key={purchase.id} purchase={purchase} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button onClick={onNextPage} variant="outline" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  )
}
