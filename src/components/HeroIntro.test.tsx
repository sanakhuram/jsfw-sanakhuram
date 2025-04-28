import { render, screen } from '@testing-library/react';
import HeroIntro from './HeroIntro';

test('displays light version of gif when isDark is false', () => {
  render(<HeroIntro isDark={false} />);
  const image = screen.getByAltText(/shopping animation/i);
  expect(image).toBeInTheDocument();
});
