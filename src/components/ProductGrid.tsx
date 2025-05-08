import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} {...product} />)
      ) : (
        <p className="text-center text-neutral-500 col-span-full">No products found.</p>
      )}
    </div>
  );
}
