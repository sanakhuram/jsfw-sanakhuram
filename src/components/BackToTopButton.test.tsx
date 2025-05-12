import { render, fireEvent } from '@testing-library/react';
import BackToTopButton from './BackToTopButton';

window.scrollTo = jest.fn();

describe('BackToTopButton', () => {
  it('scrolls to top when clicked', () => {
    const { getByRole } = render(<BackToTopButton />);

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    fireEvent.scroll(window);

    const button = getByRole('button', { name: /back to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
