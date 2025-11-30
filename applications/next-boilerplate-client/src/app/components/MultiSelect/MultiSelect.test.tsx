import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MultiSelect } from '../MultiSelect'
import type { MultiSelectItem } from '../MultiSelect'

describe('MultiSelect', () => {
  const mockItems: MultiSelectItem[] = [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
    { id: '4', label: 'Apple' },
    { id: '5', label: 'Banana' },
  ]

  const mockOnChange = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders with placeholder text', () => {
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    expect(screen.getByText('Select items')).toBeInTheDocument()
  })

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByText('Select all')).toBeInTheDocument()
  })

  it('displays all items when opened', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    await user.click(screen.getByRole('button'))

    mockItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('selects an item when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Item 1'))
    await user.click(screen.getByText('Apply'))

    expect(mockOnChange).toHaveBeenCalledWith(['1'])
  })

  it('selects multiple items', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Item 1'))
    await user.click(screen.getByText('Item 2'))
    await user.click(screen.getByText('Apply'))

    expect(mockOnChange).toHaveBeenCalledWith(['1', '2'])
  })

  it('deselects an item when clicked again', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={['1']}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Item 1'))
    await user.click(screen.getByText('Apply'))

    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  it('displays selected count when items are selected', () => {
    render(
      <MultiSelect
        items={mockItems}
        value={['1', '2']}
        onChange={mockOnChange}
        placeholder="Select items"
        selectedText="{count} items selected"
      />,
    )

    expect(screen.getByText('2 items selected')).toBeInTheDocument()
  })

  it('filters items based on search query', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
        searchPlaceholder="Search"
      />,
    )

    await user.click(screen.getByRole('button'))
    const searchInput = screen.getByPlaceholderText('Search')
    await user.type(searchInput, 'Apple')

    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })

  it('shows "No items found" message when search has no results', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
        noResultsText="No items found"
      />,
    )

    await user.click(screen.getByRole('button'))
    const searchInput = screen.getByPlaceholderText('Search')
    await user.type(searchInput, 'NonexistentItem')

    expect(screen.getByText('No items found')).toBeInTheDocument()
  })

  it('selects all visible items when "Select all" is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Select all'))
    await user.click(screen.getByText('Apply'))

    expect(mockOnChange).toHaveBeenCalledWith(['1', '2', '3', '4', '5'])
  })

  it('deselects all visible items when "Select all" is clicked with all selected', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={['1', '2', '3', '4', '5']}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Select all'))
    await user.click(screen.getByText('Apply'))

    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  it('cancels selection and reverts changes', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={['1']}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('Item 2'))
    await user.click(screen.getByText('Cancel'))

    expect(mockOnChange).not.toHaveBeenCalled()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <MultiSelect
          items={mockItems}
          value={[]}
          onChange={mockOnChange}
          placeholder="Select items"
        />
        <button>Outside button</button>
      </div>,
    )

    await user.click(screen.getByText('Select items'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.click(screen.getByText('Outside button'))

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  it('closes dropdown on Escape key', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
      />,
    )

    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  it('shows empty state message when no items provided', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={[]}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
        emptyText="No items available"
      />,
    )

    await user.click(screen.getByRole('button'))

    expect(screen.getByText('No items available')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        items={mockItems}
        value={[]}
        onChange={mockOnChange}
        placeholder="Select items"
        disabled={true}
      />,
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    await user.click(button)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
