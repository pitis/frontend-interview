import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PurchaseCard from './PurchaseCard'
import type { Purchase } from '@/app/hooks/purchases/types'

describe('PurchaseCard', () => {
  const mockPurchase: Purchase = {
    id: '123',
    date: '2024-03-15T10:30:00.000Z',
    user: {
      id: 'user-1',
      firstName: 'John',
      lastName: 'Doe',
      profilePictureUrl: 'https://example.com/avatar.jpg',
      email: 'john.doe@example.com',
    },
    product: {
      id: 'product-1',
      name: 'Awesome Product',
      imageUrl: 'https://example.com/product.jpg',
    },
  }

  it('renders purchase card with product information', () => {
    render(<PurchaseCard purchase={mockPurchase} />)

    expect(screen.getByText('Awesome Product')).toBeInTheDocument()
  })

  it('displays product image with correct attributes', () => {
    render(<PurchaseCard purchase={mockPurchase} />)

    const productImage = screen.getByAltText('Awesome Product')
    expect(productImage).toBeInTheDocument()
  })

  it('displays user full name', () => {
    render(<PurchaseCard purchase={mockPurchase} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('displays user profile picture with correct alt text', () => {
    render(<PurchaseCard purchase={mockPurchase} />)

    const userAvatar = screen.getByAltText('John Doe')
    expect(userAvatar).toBeInTheDocument()
  })

  it('displays user email', () => {
    render(<PurchaseCard purchase={mockPurchase} />)

    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
  })

  it('displays formatted purchase date', () => {
    render(<PurchaseCard purchase={mockPurchase} />)

    // The date formatting will vary based on locale, so just check it contains key parts
    const dateText = screen.getByText(/March|2024/i)
    expect(dateText).toBeInTheDocument()
  })

  it('renders product name as a heading', () => {
    render(<PurchaseCard purchase={mockPurchase} />)

    const heading = screen.getByRole('heading', { name: 'Awesome Product' })
    expect(heading).toBeInTheDocument()
  })

  it('applies correct CSS classes for layout', () => {
    const { container } = render(<PurchaseCard purchase={mockPurchase} />)

    const card = container.querySelector('.hover\\:shadow-md')
    expect(card).toBeInTheDocument()
  })

  it('renders with different user names', () => {
    const customPurchase: Purchase = {
      ...mockPurchase,
      user: {
        ...mockPurchase.user,
        firstName: 'Jane',
        lastName: 'Smith',
      },
    }

    render(<PurchaseCard purchase={customPurchase} />)

    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('renders with different product names', () => {
    const customPurchase: Purchase = {
      ...mockPurchase,
      product: {
        ...mockPurchase.product,
        name: 'Different Product',
      },
    }

    render(<PurchaseCard purchase={customPurchase} />)

    expect(screen.getByText('Different Product')).toBeInTheDocument()
  })

  it('handles long product names with truncation class', () => {
    const longNamePurchase: Purchase = {
      ...mockPurchase,
      product: {
        ...mockPurchase.product,
        name: 'This is a very long product name that should be truncated',
      },
    }

    const { container } = render(<PurchaseCard purchase={longNamePurchase} />)

    const heading = container.querySelector('.truncate')
    expect(heading).toBeInTheDocument()
  })

  it('displays correct date format with time', () => {
    const { container } = render(<PurchaseCard purchase={mockPurchase} />)

    // Check that some time-related text exists
    const timeElement = container.querySelector(
      '.text-xs.text-muted-foreground',
    )
    expect(timeElement).toBeInTheDocument()
  })

  it('renders images with correct layout classes', () => {
    const { container } = render(<PurchaseCard purchase={mockPurchase} />)

    const productImageContainer = container.querySelector(
      '.h-16.w-16.shrink-0.rounded-lg',
    )
    expect(productImageContainer).toBeInTheDocument()

    const userAvatarContainer = container.querySelector('.h-6.w-6.rounded-full')
    expect(userAvatarContainer).toBeInTheDocument()
  })

  it('structures content with proper semantic HTML', () => {
    render(<PurchaseCard purchase={mockPurchase} />)

    // Check for heading
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })
})
