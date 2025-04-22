import { Metadata } from "next"
import Image from "next/image"
import AddToCartButton from "@/components/AddToCartButton"
import { Product } from "@/types/product"

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch product');
    const { data } = await res.json();
    return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
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

    return (
        <main className="max-w-5xl mx-auto p-6 space-y-8">

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 space-y-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p>{product.description}</p>

                    <div>
                        {product.discountedPrice < product.price ? (
                            <p>
                                <span className="line-through text-red-500 mr-2">${product.price}</span>
                                <span className="text-green-600 font-bold">${product.discountedPrice}</span>
                            </p>
                        ) : (
                            <p className="font-bold">${product.price}</p>
                        )}
                        <p className="text-sm text-gray-600">Rating: {product.rating}⭐</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div>
                        <AddToCartButton product={product} />
                    </div>
                </div>

                <div className="md:w-1/2">
                    <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={product.image.url}
                            alt={product.image.alt || "Product image"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            <section className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                {product.reviews.length > 0 ? (
                    <div className="space-y-4">
                        {product.reviews.map((rev) => (
                            <div key={rev.id} className="border-l-4 border-primary pl-4">
                                <p className="font-medium">
                                    {rev.username} — <span className="text-yellow-500">{rev.rating}⭐</span>
                                </p>
                                <p className="mt-1">{rev.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </section>
        </main>

    );
}