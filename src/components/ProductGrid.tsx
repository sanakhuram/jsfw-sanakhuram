import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

interface Props {
  products: Product[];
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export default function ProductGrid({ products, totalPages, currentPage, setPage }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} {...product} />)
        ) : (
          <p className="text-center text-neutral-500 col-span-full">No products found.</p>
        )}
      </div>

      <div className="flex justify-center flex-wrap gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-red-700 text-white' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
