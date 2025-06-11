
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 2500,
    originalPrice: 3500,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f37f4feb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop'
    ],
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    description: 'Crafted from 100% premium cotton, this t-shirt offers exceptional comfort and durability.',
    features: ['100% Premium Cotton', 'Pre-shrunk', 'Reinforced stitching', 'Tagless comfort'],
    inStock: true,
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506629905607-c331d4d8ad4a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&h=500&fit=crop'
    ],
    category: 'Jeans',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    description: 'Modern slim-fit jeans with stretch denim for comfort and style.',
    features: ['Stretch denim', 'Slim fit', 'Five-pocket design', 'Button fly'],
    inStock: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Casual Hoodie',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop'
    ],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'Navy', 'Burgundy'],
    description: 'Cozy hoodie perfect for casual wear with a comfortable fit.',
    features: ['Cotton blend', 'Kangaroo pocket', 'Drawstring hood', 'Ribbed cuffs'],
    inStock: true
  },
  {
    id: '4',
    name: 'Formal Dress Shirt',
    price: 5200,
    originalPrice: 6500,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop'
    ],
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Pink'],
    description: 'Professional dress shirt ideal for formal occasions and business wear.',
    features: ['Non-iron finish', 'Spread collar', 'French placket', 'Curved hem'],
    inStock: true,
    isSale: true
  },
  {
    id: '5',
    name: 'Athletic Shorts',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1559582927-47080893abee?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506629905607-c331d4d8ad4a?w=500&h=500&fit=crop'
    ],
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray', 'Green'],
    description: 'Lightweight athletic shorts perfect for workouts and sports activities.',
    features: ['Moisture-wicking', 'Quick-dry fabric', 'Side pockets', 'Elastic waistband'],
    inStock: true,
    isNew: true
  },
  {
    id: '6',
    name: 'Winter Jacket',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop'
    ],
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Khaki'],
    description: 'Warm and stylish winter jacket with water-resistant exterior.',
    features: ['Water-resistant', 'Insulated lining', 'Multiple pockets', 'Adjustable hood'],
    inStock: true
  },
  {
    id: '7',
    name: 'Summer Dress',
    price: 4800,
    originalPrice: 6000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop'
    ],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral', 'Solid Black', 'Navy'],
    description: 'Elegant summer dress perfect for casual outings and special occasions.',
    features: ['Breathable fabric', 'A-line silhouette', 'Midi length', 'Side zip'],
    inStock: true,
    isSale: true
  },
  {
    id: '8',
    name: 'Sports Sneakers',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop'
    ],
    category: 'Shoes',
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: ['White', 'Black', 'Gray'],
    description: 'Comfortable sports sneakers with excellent cushioning and support.',
    features: ['Cushioned sole', 'Breathable mesh', 'Lace-up design', 'Rubber outsole'],
    inStock: true,
    isNew: true
  }
];

export const categories = [
  'All',
  'T-Shirts',
  'Jeans',
  'Hoodies',
  'Shirts',
  'Shorts',
  'Jackets',
  'Dresses',
  'Shoes'
];
