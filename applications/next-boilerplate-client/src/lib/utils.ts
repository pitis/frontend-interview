import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSelectedLabels<
  T extends { id: ID; label: string },
  ID extends string | number,
>(selectedIds: ID[], items: T[]): string {
  if (selectedIds.length === 0) return 'None'

  return items
    .filter((item) => selectedIds.includes(item.id))
    .map((item) => item.label)
    .join(', ')
}
