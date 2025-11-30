# Frontend Interview Project

A full-stack application for browsing and filtering purchases using Next.js, Apollo Client, and GraphQL.

## 🚀 Features

### Core Functionality

- **Multi-select Filters**: Filter purchases by products and users with an accessible multi-select component
- **Cursor-based Pagination**: Load more purchases with "Load More" functionality (30 items per page)
- **Real-time Search**: Search through 300 products and 100 users
- **Responsive Grid Layout**:
  - 3 columns on desktop (lg)
  - 2 columns on tablet (md)
  - 1 column on mobile
- **Image Optimization**: Next.js Image component with proper image handling
- **Comprehensive Testing**: Vitest with React Testing Library (30 tests)

### Technical Implementation

- ✅ Apollo Client for GraphQL data fetching
- ✅ Custom hooks organized by domain (products, users, purchases)
- ✅ TypeScript throughout
- ✅ Tailwind CSS with shadcn/ui components
- ✅ Proper ARIA attributes for accessibility
- ✅ Loading states with skeleton components
- ✅ Error handling

## 📁 Project Structure

```
applications/
├── graphql-server/          # Apollo Server with mock data
│   └── server.ts           # 300 products, 100 users, 150 purchases
└── next-boilerplate-client/
    └── src/
        ├── app/
        │   ├── page.tsx                    # Main purchases page
        │   ├── multiselect/page.tsx        # MultiSelect demo page
        │   ├── components/
        │   │   ├── MultiSelect/            # Multi-select component
        │   │   │   ├── MultiSelect.tsx
        │   │   │   ├── MultiSelect.test.tsx (16 tests)
        │   │   │   └── index.ts
        │   │   ├── PurchaseCard/           # Purchase card component
        │   │   │   ├── PurchaseCard.tsx
        │   │   │   ├── PurchaseCard.test.tsx (14 tests)
        │   │   │   └── index.ts
        │   │   └── PurchasesList.tsx       # Purchase list with pagination
        │   └── hooks/
        │       ├── products/               # Product queries
        │       ├── users/                  # User queries
        │       └── purchases/              # Purchase queries with pagination
        └── vitest.config.ts
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ (using v22.18.0)
- npm

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Start the GraphQL server:**

```bash
cd applications/graphql-server
npm start
```

Server runs at `http://localhost:4000`

3. **Start the Next.js client:**

```bash
cd applications/next-boilerplate-client
npm run dev
```

Client runs at `http://localhost:3000`

## 🧪 Testing

Run the test suite with Vitest:

```bash
cd applications/next-boilerplate-client

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

**Test Coverage:**

- MultiSelect: 16 tests (selection, search, accessibility)
- PurchaseCard: 14 tests (rendering, data display, styling)

## 📄 Available Pages

- **`/`** - Main purchases page with filtering
- **`/multiselect`** - Standalone MultiSelect component demo

## 🎨 Design Features

- **Shadcn/ui Components**: Button, Card, Skeleton
- **Custom MultiSelect**:
  - Search functionality
  - Select all/deselect all
  - Keyboard navigation (Escape to close)
  - Click outside to close
  - Loading states
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Hover Effects**: Cards have subtle hover shadow transitions

## 🔧 Implementation Notes

### Image Handling

The original server used an older version of Faker.js that generated image URLs pointing to non-existent resources. This was fixed by upgrading Faker.js to a newer version that provides reliable image URLs. Images are now configured with:

- Next.js Image component for optimization
- Remote patterns in `next.config.mjs` for external image domains
- Fallback background colors for better UX during image loads

### Pagination Implementation

- Uses Apollo Client's `fetchMore` for cursor-based pagination
- Loads 30 purchases initially
- "Load More" button fetches next 30 purchases
- Maintains scroll position during pagination

### State Management

- Apollo Client cache for GraphQL data
- React state for UI (selected filters, search)
- No additional state management library needed

## 📊 Data

- **Products**: 300 randomly generated products (Faker.js)
- **Users**: 100 randomly generated users (Faker.js)
- **Purchases**: 150 randomly generated purchases linking products and users

## 🚦 Performance Considerations

- Fetches all 300 products and 100 users upfront (small dataset)
- Purchases use pagination (30 at a time)
- Apollo Client caching reduces redundant queries
- Next.js Image optimization for better load times

## 🎯 Key Challenges Solved

1. **Image Loading Issues**: Fixed unreliable Faker image URLs with proper Next.js configuration
2. **Type Safety**: Full TypeScript coverage with proper types for GraphQL responses
3. **Component Organization**: Folder-based structure with colocated tests
4. **Accessibility**: Proper ARIA labels, keyboard navigation, and semantic HTML
5. **Responsive Design**: Grid layout that adapts to all screen sizes

## 🤖 AI Assistance

See [AI-SUPPORT.md](./AI-SUPPORT.md) for details on where AI was used in this project.

## 📝 Original Requirements

All requirements from the original assignment have been implemented:

- ✅ Multi-select component for filtering
- ✅ GraphQL integration with Apollo Client
- ✅ Pagination support
- ✅ Responsive design
- ✅ TypeScript
- ✅ Testing setup
- ✅ Clean component architecture

## 🛡️ Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **GraphQL**: Apollo Client, Apollo Server
- **Testing**: Vitest, React Testing Library
- **Data**: Faker.js

---
