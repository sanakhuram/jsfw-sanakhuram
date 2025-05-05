
//lib/api.ts

import { Product } from '@/types/product';

export async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`, {
        cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    const { data } = await response.json();
    return data;
}

export async function getAllProducts(): Promise<Product[]> {
    const res = await fetch('https://v2.api.noroff.dev/online-shop');
    if (!res.ok) throw new Error('Failed to fetch all products');
    const { data } = await res.json();
    return data;
}
