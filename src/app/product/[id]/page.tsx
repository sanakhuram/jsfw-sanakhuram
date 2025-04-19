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
        <main>
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                    src={product.image.url}
                    alt={product.image.alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div>
                <h1>
                    {product.title}
                </h1>
                <p>
                    {product.description}
                </p>

            </div>
            <div>
                {product.discountedPrice < product.price ? (
                    <p>
                        <span>
                            ${product.price}
                        </span>
                        <span>
                            ${product.discountedPrice}
                        </span>
                    </p>
                ) : (
                    <p>${product.price}</p>
                )}
                <p>
                    Rating: {product.rating}⭐
                </p>
            </div>

            <div>
                {product.tags.map((tag) => (
                    <span key={tag}
                    >
                        {tag}

                    </span>
                ))}
            </div>

            <div>
                <AddToCartButton product={product}/>
            </div>

            <section>
                <h2>
                    Reviews
                </h2>
                {product.reviews.length > 0 ? (
                    <div>
                        {product.reviews.map((rev)=>(
                            <div
                            key={rev.id}
                            >
                                <p>
                                    {rev.username} —{' '}
                                    <span>{rev.rating}⭐</span>
                                </p>
                                <p>
                                    {rev.description}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </section>


        </main>
    );
}