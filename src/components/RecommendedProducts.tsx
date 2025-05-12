import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

export default function RecommendedProducts({ recommended }: { recommended: Product[] }) {
  if (!recommended.length) return null;

  return (
    <section className="bg-gray-100 dark:bg-black dark:shadow-gray-700 p-4 sm:p-6 mb-6 rounded-xl shadow-md shadow-gray-300">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">You might also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {recommended.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
