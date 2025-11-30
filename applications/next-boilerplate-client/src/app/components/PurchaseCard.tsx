import { Card } from './ui/card'
import Image from 'next/image'
import type { Purchase } from '@/app/hooks/purchases/types'

interface Props {
  purchase: Purchase
}

export default function PurchaseCard({ purchase }: Readonly<Props>) {
  return (
    <Card key={purchase.id} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={purchase.product.imageUrl}
            alt={purchase.product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate">
            {purchase.product.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={purchase.user.profilePictureUrl}
                alt={`${purchase.user.firstName} ${purchase.user.lastName}`}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {purchase.user.firstName} {purchase.user.lastName}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {purchase.user.email}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {new Date(purchase.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </Card>
  )
}
