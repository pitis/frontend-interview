'use client'

import * as React from 'react'
import { Search, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type KeyboardEvent,
} from 'react'

export interface MultiSelectItem {
  id: string
  label: string
}

export interface MultiSelectProps {
  items: MultiSelectItem[]
  value: string[]
  placeholder?: string
  selectedText?: string
  className?: string
  searchPlaceholder?: string
  selectAllText?: string
  cancelText?: string
  applyText?: string
  noResultsText?: string
  emptyText?: string
  disabled?: boolean
  onChange: (value: string[]) => void
}

export function MultiSelect({
  items,
  value,
  onChange,
  placeholder = 'Select items',
  selectedText = '{count} items selected',
  className,
  searchPlaceholder = 'Search',
  selectAllText = 'Select all',
  cancelText = 'Cancel',
  applyText = 'Apply',
  noResultsText = 'No items found',
  emptyText = 'No items available',
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [internalSelection, setInternalSelection] = useState<string[]>(value)

  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setInternalSelection(value)
    }
  }, [value, isOpen])

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [items, searchQuery])

  const allVisibleSelected = useMemo(() => {
    if (filteredItems.length === 0) return false
    return filteredItems.every((item) => internalSelection.includes(item.id))
  }, [filteredItems, internalSelection])

  const someVisibleSelected = useMemo(() => {
    if (filteredItems.length === 0) return false
    const selectedCount = filteredItems.filter((item) =>
      internalSelection.includes(item.id),
    ).length
    return selectedCount > 0 && selectedCount < filteredItems.length
  }, [filteredItems, internalSelection])

  const handleOpen = () => {
    if (disabled) return
    setIsOpen(true)
    setInternalSelection(value)
    setSearchQuery('')
    setTimeout(() => searchInputRef.current?.focus(), 0)
  }

  const handleCancel = useCallback(() => {
    setIsOpen(false)
    setInternalSelection(value)
    setSearchQuery('')
  }, [value])

  const handleApply = () => {
    onChange(internalSelection)
    setIsOpen(false)
    setSearchQuery('')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleCancel()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleCancel])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCancel()
    }
  }

  const toggleItem = (itemId: string) => {
    setInternalSelection((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    )
  }

  const toggleAll = () => {
    if (allVisibleSelected) {
      const visibleIds = new Set(filteredItems.map((item) => item.id))
      setInternalSelection((prev) => prev.filter((id) => !visibleIds.has(id)))
    } else {
      const newSelection = new Set(internalSelection)
      filteredItems.forEach((item) => newSelection.add(item.id))
      setInternalSelection(Array.from(newSelection))
    }
  }

  const displayText = useMemo(() => {
    if (value.length === 0) return placeholder
    return selectedText.replace('{count}', value.length.toString())
  }, [value.length, placeholder, selectedText])

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={isOpen ? handleCancel : handleOpen}
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-between rounded-md border bg-background px-3 py-2.5 text-sm',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isOpen
            ? 'border-teal-500 ring-1 ring-teal-500'
            : 'border-input hover:border-muted-foreground/50',
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={cn(
            'truncate',
            value.length === 0 && 'text-muted-foreground',
          )}
        >
          {displayText}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute z-50 mt-1 w-full rounded-md border border-input bg-white shadow-lg animate-in fade-in-0 zoom-in-95"
          role="listbox"
          aria-multiselectable="true"
        >
          <div className="border-b border-border p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-md bg-transparent py-1.5 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none"
                aria-label={searchPlaceholder}
              />
            </div>
          </div>

          <div className="max-h-[200px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                {noResultsText}
              </div>
            ) : (
              <>
                <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5 border-b border-border hover:bg-accent transition-colors duration-150">
                  <div
                    className={cn(
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors duration-150',
                      allVisibleSelected || someVisibleSelected
                        ? 'border-teal-500 bg-teal-500'
                        : 'border-muted-foreground/50',
                    )}
                    role="checkbox"
                    aria-checked={
                      someVisibleSelected ? 'mixed' : allVisibleSelected
                    }
                  >
                    {allVisibleSelected && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                    {someVisibleSelected && !allVisibleSelected && (
                      <div className="h-0.5 w-2 bg-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAll}
                    className="sr-only"
                    aria-label={selectAllText}
                  />
                  <span className="text-sm text-foreground">
                    {selectAllText}
                  </span>
                </label>

                {filteredItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-accent transition-colors duration-150"
                  >
                    <div
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors duration-150',
                        internalSelection.includes(item.id)
                          ? 'border-teal-500 bg-teal-500'
                          : 'border-muted-foreground/50',
                      )}
                      role="checkbox"
                      aria-checked={internalSelection.includes(item.id)}
                    >
                      {internalSelection.includes(item.id) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={internalSelection.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="sr-only"
                      aria-label={item.label}
                    />
                    <span className="text-sm text-foreground">
                      {item.label}
                    </span>
                  </label>
                ))}
              </>
            )}
          </div>

          <footer className="flex items-center justify-between border-t border-border px-3 py-2">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-medium text-foreground hover:text-muted-foreground focus:outline-none focus:underline transition-colors duration-150"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-md bg-teal-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-150"
            >
              {applyText}
            </button>
          </footer>
        </div>
      )}
    </div>
  )
}
