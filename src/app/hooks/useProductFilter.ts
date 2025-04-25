import { useMemo } from 'react';
import { Product } from '@/types/product';

interface FilterOptions {
  search: string;
  sortBy: 'price' | 'title';
  sortDir: 'asc' | 'desc';
  currentPage: number;
  perPage: number;
}

export function useProductFilter(products: Product[], options: FilterOptions) {
  const { search, sortBy, sortDir, currentPage, perPage } = options;

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    result.sort((a, b) => {
      const aValue = sortBy === 'price' ? a.discountedPrice : a.title.toLowerCase();

      const bValue = sortBy === 'price' ? b.discountedPrice : b.title.toLowerCase();

      if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [products, search, sortBy, sortDir]);

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return {
    filtered,
    paginated,
    total,
    totalPages,
  };
}
