import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

const product = {
  id: '1',
  title: 'Test Product',
  price: 100,
  discountedPrice: 80,
  description: 'A great product',
  rating: 4.5,
  image: { url: '/test.jpg', alt: 'Test image' },
  tags: [],
  reviews: [],
};

test('renders product details and discount badge', () => {
  render(<ProductCard {...product} />);
  expect(screen.getByText(/test product/i)).toBeInTheDocument();
  expect(screen.getByText(/\$100\.00/)).toBeInTheDocument();
  expect(screen.getByText(/\$80\.00/)).toBeInTheDocument();
  expect(screen.getByText(/% off/i)).toBeInTheDocument();
});
