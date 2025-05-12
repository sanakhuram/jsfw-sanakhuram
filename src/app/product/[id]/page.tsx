import { Metadata } from 'next';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import RecommendedProducts from '@/components/RecommendedProducts';
import { getProduct, getAllProducts } from '@/lib/api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  const allProducts = await getAllProducts();

  const recommended = allProducts
    .filter((p) => p.id !== product.id && p.tags.some((tag) => product.tags.includes(tag)))
    .slice(0, 4);

  return (
    <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{product.title}</h1>
          <p className="text-sm sm:text-base">{product.description}</p>
          <div>
            {product.discountedPrice < product.price ? (
              <p>
                <span className="line-through text-red-500 mr-2 text-sm sm:text-base">
                  ${product.price}
                </span>
                <span className="text-green-600 font-bold text-base sm:text-lg">
                  ${product.discountedPrice}
                </span>
              </p>
            ) : (
              <p className="font-bold text-base sm:text-lg">${product.price}</p>
            )}
            <p className="text-xs sm:text-sm mt-4">Rating: {product.rating}⭐</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 dark:border border-amber-500 dark:bg-black px-2 py-1 rounded-full text-xs sm:text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div>
            <AddToCartButton product={product} />
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md dark:shadow-gray-700 shadow-gray-300">
            <Image
              src={product.image.url}
              alt={product.image.alt || 'Product image'}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-black p-4 sm:p-6 rounded-xl shadow-md dark:shadow-gray-700 shadow-gray-300">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-l-4 border-primary pl-4">
                <p className="font-medium text-sm sm:text-base">
                  {review.username} — <span className="text-yellow-500">{review.rating}⭐</span>
                </p>
                <p className="mt-1 text-sm sm:text-base">{review.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </section>

      <RecommendedProducts recommended={recommended} />
    </main>
  );
}
