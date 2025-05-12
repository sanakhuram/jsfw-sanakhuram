// lib/api.ts

import axios from 'axios';
import { Product } from '@/types/product';

const BASE_URL = 'https://v2.api.noroff.dev/online-shop';

export async function getProduct(id: string): Promise<Product> {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data.data;
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await axios.get(BASE_URL);
  return res.data.data;
}
