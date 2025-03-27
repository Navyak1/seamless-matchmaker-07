
// Define image categories and their items
export interface ImageItem {
  src: string;
  answer: string;
  options: string[];
}

export interface ImageCategory {
  name: string;
  items: ImageItem[];
}

export const imageCategories: ImageCategory[] = [
  {
    name: 'Nature',
    items: [
      { src: '/images/nature-1.jpg', answer: 'Mountain Range', options: ['Mountain Range', 'Desert', 'Beach', 'Waterfall'] },
      { src: '/images/nature-2.jpg', answer: 'Forest', options: ['Forest', 'Jungle', 'Savanna', 'Garden'] },
      { src: '/images/nature-3.jpg', answer: 'Lake', options: ['Lake', 'Ocean', 'River', 'Pond'] },
    ]
  },
  {
    name: 'Fruits',
    items: [
      { src: '/images/fruit-1.jpg', answer: 'Strawberry', options: ['Strawberry', 'Raspberry', 'Blueberry', 'Cherry'] },
      { src: '/images/fruit-2.jpg', answer: 'Banana', options: ['Banana', 'Mango', 'Pineapple', 'Papaya'] },
      { src: '/images/fruit-3.jpg', answer: 'Apple', options: ['Apple', 'Pear', 'Peach', 'Plum'] },
    ]
  },
  {
    name: 'Vegetables',
    items: [
      { src: '/images/vegetable-1.jpg', answer: 'Carrot', options: ['Carrot', 'Pepper', 'Radish', 'Sweet Potato'] },
      { src: '/images/vegetable-2.jpg', answer: 'Broccoli', options: ['Broccoli', 'Spinach', 'Kale', 'Lettuce'] },
      { src: '/images/vegetable-3.jpg', answer: 'Tomato', options: ['Tomato', 'Bell Pepper', 'Eggplant', 'Onion'] },
    ]
  },
  {
    name: 'Toys',
    items: [
      { src: '/images/toy-1.jpg', answer: 'Teddy Bear', options: ['Teddy Bear', 'Action Figure', 'Doll', 'Robot'] },
      { src: '/images/toy-2.jpg', answer: 'Building Blocks', options: ['Building Blocks', 'Puzzle', 'Board Game', 'Play-Doh'] },
      { src: '/images/toy-3.jpg', answer: 'Toy Car', options: ['Toy Car', 'Train Set', 'Remote Control Helicopter', 'Bicycle'] },
    ]
  },
  {
    name: 'Cartoon Characters',
    items: [
      { src: '/images/cartoon-1.jpg', answer: 'Mickey Mouse', options: ['Mickey Mouse', 'Donald Duck', 'Goofy', 'Pluto'] },
      { src: '/images/cartoon-2.jpg', answer: 'SpongeBob', options: ['SpongeBob', 'Patrick Star', 'Squidward', 'Mr. Krabs'] },
      { src: '/images/cartoon-3.jpg', answer: 'Pikachu', options: ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur'] },
    ]
  }
];

// Placeholder images in case the actual ones aren't available
export const placeholderImages = [
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
];
