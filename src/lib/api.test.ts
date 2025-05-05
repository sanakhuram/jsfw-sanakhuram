import { getProduct, getAllProducts } from "./api";

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

const mockResponse = {
    ok: true,
    json: async () => ({ data: [mockProduct] }),
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe('API utility functions', () => {
    it('getAllProducts should return a product array', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        const products = await getAllProducts();
        expect(products).toEqual([mockProduct]);
        expect(fetch).toHaveBeenCalledWith('https://v2.api.noroff.dev/online-shop');
    });

    it('getProduct should return a single product', async () => {
        const mockSingleProductResponse = {
            ok: true,
            json: async () => ({ data: mockProduct }),
        };

        (fetch as jest.Mock).mockResolvedValueOnce(mockSingleProductResponse);

        const product = await getProduct('123');
        expect(product).toEqual(mockProduct);
        expect(fetch).toHaveBeenCalledWith(
            'https://v2.api.noroff.dev/online-shop/123',
            expect.objectContaining({ cache: 'no-store' })
        );
    });

    it('throws error on failed fetch', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        await expect(getAllProducts()).rejects.toThrow('Failed to fetch all products');
    });
});
