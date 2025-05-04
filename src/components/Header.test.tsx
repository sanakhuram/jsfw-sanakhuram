import { render, screen } from '@testing-library/react';
import Header from './Header';
import { CartProvider } from '@/context/CartContext';
import { FavouritesProvider } from '@/context/FavouritesContext';

test('renders header with logo and cart', () => {
  render(
    <CartProvider>
      <FavouritesProvider>
        <Header />
      </FavouritesProvider>
    </CartProvider>
  );

  expect(screen.getByText(/vibe cart/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/cart/i)).toBeInTheDocument();
});
