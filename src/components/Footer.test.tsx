import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';

test('renders subscribe input and handles invalid email', () => {
  render(<Footer />);
  const input = screen.getByPlaceholderText(/your email/i);
  fireEvent.change(input, { target: { value: 'invalid-email' } });

  const button = screen.getByText(/subscribe/i);
  fireEvent.click(button);

  expect(input).toHaveValue('invalid-email');
});
