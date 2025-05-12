import { render, screen, fireEvent } from '@testing-library/react';
import SortSearchBar from './SortSearchBar';

test('renders and updates search input', () => {
  const onSearchChange = jest.fn();
  const setSortBy = jest.fn();
  const setSortDir = jest.fn();

  render(
    <SortSearchBar
      search=""
      onSearchChange={onSearchChange}
      sortBy="price"
      sortDir="desc"
      setSortBy={setSortBy}
      setSortDir={setSortDir}
    />,
  );

  const input = screen.getByPlaceholderText(/search products/i);
  fireEvent.change(input, { target: { value: 'shoes' } });
  expect(onSearchChange).toHaveBeenCalledWith('shoes');
});
