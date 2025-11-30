'use client'

import { useState } from 'react'
import { MultiSelect } from '../components/MultiSelect'
import { productItems, sportClassItems, userItems } from '../data'
import { formatSelectedLabels } from '@/lib/utils'

export default function DemoPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-12">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Multi-Select Component Demo
          </h1>
          <p className="text-muted-foreground">
            A reusable, responsive multi-selection dropdown component that can
            be used across different domains.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-foreground">
              Product Selection
            </h2>
            <MultiSelect
              items={productItems}
              value={selectedProducts}
              onChange={setSelectedProducts}
              placeholder="Select Product"
              selectedText="{count} products selected"
            />
            <p className="text-xs text-muted-foreground">
              Selected: {formatSelectedLabels(selectedProducts, productItems)}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium text-foreground">
              User Selection
            </h2>
            <MultiSelect
              items={userItems}
              value={selectedUsers}
              onChange={setSelectedUsers}
              placeholder="Select Users"
              selectedText="{count} users selected"
              searchPlaceholder="Search users..."
            />
            <p className="text-xs text-muted-foreground">
              Selected: {formatSelectedLabels(selectedUsers, userItems)}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium text-foreground">
              Sport Class Selection
            </h2>
            <MultiSelect
              items={sportClassItems}
              value={selectedClasses}
              onChange={setSelectedClasses}
              placeholder="Select Classes"
              selectedText="{count} classes selected"
              selectAllText="Select all classes"
            />
            <p className="text-xs text-muted-foreground">
              Selected: {formatSelectedLabels(selectedClasses, sportClassItems)}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium text-foreground">
              Empty State Demo
            </h2>
            <MultiSelect
              items={[]}
              value={[]}
              onChange={() => {}}
              placeholder="No items available"
              emptyText="No categories have been created yet"
            />
            <p className="text-xs text-muted-foreground">
              Demonstrates empty state handling
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
