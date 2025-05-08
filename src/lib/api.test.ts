jest.mock('axios');
import axios from 'axios';
import { getAllProducts, getProduct } from './api';

global.fetch = jest.fn();

const mockProduct = {
    id: '123',
    title: 'Test Product',
    price: 100,
    discountedPrice: 90,
    description: 'Test product description',
    rating: 4.5,
    tags: ['tag1'],
    image: { url: '/image.jpg', alt: 'alt text' },
    reviews: [],
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe('API utility functions', () => {
    it('getAllProducts should return a product array', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: { data: [mockProduct] },
        });

        const products = await getAllProducts();
        expect(products).toEqual([mockProduct]);
        expect(axios.get).toHaveBeenCalledWith('https://v2.api.noroff.dev/online-shop');
    });

    it('getProduct should return a single product', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: { data: mockProduct },
        });

        const product = await getProduct('123');
        expect(product).toEqual(mockProduct);
        expect(axios.get).toHaveBeenCalledWith('https://v2.api.noroff.dev/online-shop/123');
    });

    it('throws error on failed fetch', async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch all products'));

        await expect(getAllProducts()).rejects.toThrow('Failed to fetch all products');
    });
});
