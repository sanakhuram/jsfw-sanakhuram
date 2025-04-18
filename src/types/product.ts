// src/types/product.ts

export interface Review {
    id: string;
    username: string;
    rating: number;
    description: string;
  }
  
  export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountedPrice: number;
    rating: number;
    image: {
      url: string;
      alt: string;
    };
    tags: string[];         
    reviews: Review[];      
  }
  