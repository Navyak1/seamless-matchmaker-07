
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
      { src: '/images/fruit-4.jpg', answer: 'Watermelon', options: ['Watermelon', 'Cantaloupe', 'Honeydew', 'Kiwi'] },
      { src: '/images/fruit-5.jpg', answer: 'Grapes', options: ['Grapes', 'Blueberries', 'Currants', 'Blackberries'] },
    ]
  },
  {
    name: 'Vegetables',
    items: [
      { src: '/images/vegetable-1.jpg', answer: 'Carrot', options: ['Carrot', 'Pepper', 'Radish', 'Sweet Potato'] },
      { src: '/images/vegetable-2.jpg', answer: 'Broccoli', options: ['Broccoli', 'Spinach', 'Kale', 'Lettuce'] },
      { src: '/images/vegetable-3.jpg', answer: 'Tomato', options: ['Tomato', 'Bell Pepper', 'Eggplant', 'Onion'] },
      { src: '/images/vegetable-4.jpg', answer: 'Potato', options: ['Potato', 'Turnip', 'Cassava', 'Parsnip'] },
      { src: '/images/vegetable-5.jpg', answer: 'Corn', options: ['Corn', 'Peas', 'Green Beans', 'Okra'] },
    ]
  },
  {
    name: 'Flowers',
    items: [
      { src: '/images/flower-1.jpg', answer: 'Rose', options: ['Rose', 'Tulip', 'Carnation', 'Peony'] },
      { src: '/images/flower-2.jpg', answer: 'Sunflower', options: ['Sunflower', 'Daisy', 'Dandelion', 'Marigold'] },
      { src: '/images/flower-3.jpg', answer: 'Lily', options: ['Lily', 'Orchid', 'Iris', 'Daffodil'] },
      { src: '/images/flower-4.jpg', answer: 'Tulip', options: ['Tulip', 'Crocus', 'Hyacinth', 'Poppy'] },
    ]
  },
  {
    name: 'Toys',
    items: [
      { src: '/images/toy-1.jpg', answer: 'Teddy Bear', options: ['Teddy Bear', 'Action Figure', 'Doll', 'Robot'] },
      { src: '/images/toy-2.jpg', answer: 'Building Blocks', options: ['Building Blocks', 'Puzzle', 'Board Game', 'Play-Doh'] },
      { src: '/images/toy-3.jpg', answer: 'Toy Car', options: ['Toy Car', 'Train Set', 'Remote Control Helicopter', 'Bicycle'] },
      { src: '/images/toy-4.jpg', answer: 'Doll', options: ['Doll', 'Action Figure', 'Stuffed Animal', 'Puppet'] },
      { src: '/images/toy-5.jpg', answer: 'Ball', options: ['Ball', 'Frisbee', 'Yo-yo', 'Jump Rope'] },
    ]
  },
  {
    name: 'Cartoon Characters',
    items: [
      { src: '/images/cartoon-1.jpg', answer: 'Mickey Mouse', options: ['Mickey Mouse', 'Donald Duck', 'Goofy', 'Pluto'] },
      { src: '/images/cartoon-2.jpg', answer: 'SpongeBob', options: ['SpongeBob', 'Patrick Star', 'Squidward', 'Mr. Krabs'] },
      { src: '/images/cartoon-3.jpg', answer: 'Pikachu', options: ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur'] },
      { src: '/images/cartoon-4.jpg', answer: 'Mario', options: ['Mario', 'Luigi', 'Bowser', 'Toad'] },
      { src: '/images/cartoon-5.jpg', answer: 'Elsa', options: ['Elsa', 'Anna', 'Olaf', 'Kristoff'] },
    ]
  },
  {
    name: 'Animals',
    items: [
      { src: '/images/animal-1.jpg', answer: 'Elephant', options: ['Elephant', 'Rhino', 'Hippo', 'Giraffe'] },
      { src: '/images/animal-2.jpg', answer: 'Lion', options: ['Lion', 'Tiger', 'Leopard', 'Cheetah'] },
      { src: '/images/animal-3.jpg', answer: 'Dolphin', options: ['Dolphin', 'Whale', 'Shark', 'Seal'] },
      { src: '/images/animal-4.jpg', answer: 'Penguin', options: ['Penguin', 'Puffin', 'Seagull', 'Albatross'] },
    ]
  }
];

// Placeholder images in case the actual ones aren't available
export const placeholderImages = [
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9', // fruit
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07', // flower
  'https://images.unsplash.com/photo-1582562124811-c09040d0a901', // animal
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', // colorful
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d', // technology
];
