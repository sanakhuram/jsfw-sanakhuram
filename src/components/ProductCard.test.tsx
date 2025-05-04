import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '@/context/CartContext';
import { FavouritesProvider } from '@/context/FavouritesContext';

const product = {
  id: '1',
  title: 'Test Product',
  price: 200,
  discountedPrice: 80,
  description: 'A great product',
  rating: 4.5,
  image: { url: '/test.jpg', alt: 'Test image' },
  tags: [],
  reviews: [],
};

test('renders product details and discount badge', () => {
  render(
    <CartProvider>
      <FavouritesProvider>
        <ProductCard {...product} />
      </FavouritesProvider>
    </CartProvider>
  );

  expect(screen.getByText(/test product/i)).toBeInTheDocument();
  expect(screen.getByText(/\$200\.00/)).toBeInTheDocument();
  expect(screen.getByText(/\$80\.00/)).toBeInTheDocument();
  expect(screen.getByText(/% off/i)).toBeInTheDocument();
});
