import { FiSearch } from 'react-icons/fi';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: 'price' | 'title';
  sortDir: 'asc' | 'desc';
  setSortBy: (val: 'price' | 'title') => void;
  setSortDir: (val: 'asc' | 'desc') => void;
}

export default function SortSearchBar({
  search,
  onSearchChange,
  sortBy,
  sortDir,
  setSortBy,
  setSortDir,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="relative w-full md:w-1/3">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          className="pl-10 pr-4 py-2 border border-gray-400 rounded w-full"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex gap-2 items-center">
        <label className="flex items-center gap-1">
          {sortBy === 'price' ? '💰' : '🔤'}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'title')}
            className="px-2 py-1 rounded"
          >
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </label>
        <button
          onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
          className="flex items-center px-2 py-1 rounded border border-gray-400 hover:bg-gray-100 transition"
        >
          {sortDir === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </button>
      </div>
    </div>
  );
}
