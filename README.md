# Product Catalog System Documentation

## Overview

This is a Next.js-based product catalog system that allows users to manage and display products. The system includes features for displaying featured products, filtering products, and performing CRUD operations.

## Key Components

### 1. Products Page (`page.tsx`)

The main products page component that provides filtering and product listing functionality.

#### Features:

- Search functionality with debouncing
- Category filtering
- Responsive layout
- Fixed sidebar for filters

#### Key Props and State:

```typescript
interface Filters {
  search: string;
  category: string;
}
```

#### Usage Example:

```jsx
<ProductsPage />
```

### 2. Featured Products (`page.tsx`)

A component that displays a curated list of featured products on the homepage.

#### Features:

- Random selection of 4 featured products
- Responsive grid layout
- Loading states with skeleton cards
- Hero section with product catalog description

#### Implementation Details:

- Uses Supabase for data fetching
- Implements client-side randomization
- Responsive image handling with Next.js Image component

### 3. Product List (`product-list.tsx`)

A reusable component for displaying a filtered list of products.

#### Props Interface:

```typescript
interface Props {
  filters: {
    search: string;
    category: string;
  };
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}
```

#### Features:

- Grid layout with responsive design
- Product card display with image, title, description, and price
- Product management actions (update/delete)
- Client-side filtering based on search and category

## Data Management

### Supabase Integration

The system uses Supabase as its backend database. Products are stored with the following schema:

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}
```

### Data Operations:

1. **Fetch Products:**

   ```javascript
   const { data, error } = await supabase.from("products").select("*");
   ```

2. **Delete Product:**
   ```javascript
   const { error } = await supabase.from("products").delete().eq("id", id);
   ```

## UI Components

### Cards

The system uses a custom Card component system with the following variants:

- `Card`
- `CardContent`
- `CardHeader`
- `CardTitle`
- `CardFooter`

### Form Elements

- `Input`: Text input component
- `Select`: Dropdown selection component with custom styling
- `Button`: Multi-variant button component

### Loading States

The system implements skeleton loading states for better user experience:

```jsx
<SkeletonProductCard length={4} />
```

## Styling

### Tailwind CSS Classes

The system uses Tailwind CSS for styling with custom utility classes:

- Responsive classes: `md:`, `lg:`, `sm:`
- Grid layouts: `grid`, `grid-cols-*`
- Spacing: `space-y-*`, `gap-*`
- Flexbox: `flex`, `flex-col`, `items-center`

### Responsive Design

The layout is responsive with different breakpoints:

- Mobile: Default styling
- Tablet: `md:` prefix classes
- Desktop: `lg:` prefix classes

## Best Practices

### Image Handling

- Use Next.js `Image` component for optimized image loading
- Implement proper aspect ratios using `aspect-square`
- Use `object-cover` for consistent image display

### State Management

- Implement debouncing for search inputs
- Use separate states for filtered and all products
- Maintain loading states for better UX

### Error Handling

- Implement error logging for Supabase operations
- Handle loading states appropriately
- Provide feedback for failed operations

## Performance Considerations

### Optimization Techniques

1. Debounced search to prevent excessive API calls
2. Client-side filtering for better performance
3. Lazy loading of images
4. Skeleton loading states for better perceived performance

### Caching

- Products are cached in client-side state
- Filtering is performed on cached data to minimize API calls

## Future Improvements

1. Implement server-side pagination
2. Add sorting functionality
3. Implement batch delete operations
4. Add image optimization and lazy loading
5. Implement advanced filtering options
6. Add product analytics and tracking
