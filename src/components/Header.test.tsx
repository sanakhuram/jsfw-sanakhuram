import { render, screen } from '@testing-library/react';
import Header from './Header';
import { CartProvider } from '@/context/CartContext';

test('renders header with logo and cart', () => {
  render(
    <CartProvider>
      <Header />
    </CartProvider>
  );

  expect(screen.getByText(/vibe cart/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/cart/i)).toBeInTheDocument();
});
