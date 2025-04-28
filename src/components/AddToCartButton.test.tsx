import { render, screen, fireEvent } from '@testing-library/react';
import AddToCartButton from './AddToCartButton';
import { CartProvider } from '@/context/CartContext';

const product = {
  id: '1',
  title: 'Test Product',
  price: 100,
  discountedPrice: 80,
  description: 'A sample product description.',
  rating: 4,
  image: { url: '/test.jpg', alt: 'Product Image' },
  tags: ['test', 'mock'],
  reviews: [],
};

test('renders Add to Cart button and clicks it', () => {
  render(
    <CartProvider>
      <AddToCartButton product={product} />
    </CartProvider>
  );

  const button = screen.getByText(/add to cart/i);
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
});
