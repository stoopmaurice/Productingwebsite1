
import { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Luxe Draadloze Koptelefoon",
    price: 299.00,
    description: "Premium geluidskwaliteit met actieve ruisonderdrukking. Perfect voor werk en ontspanning.",
    category: Category.TECH,
    image: "https://picsum.photos/seed/headphones/600/600",
    rating: 4.8
  },
  {
    id: 2,
    name: "Minimalistische Rugzak",
    price: 89.95,
    description: "Een stijlvolle, waterbestendige rugzak met een speciaal vak voor je 15-inch laptop.",
    category: Category.FASHION,
    image: "https://picsum.photos/seed/backpack/600/600",
    rating: 4.5
  },
  {
    id: 3,
    name: "Slimme Wandlamp",
    price: 124.50,
    description: "Moderne verlichting die je kunt bedienen met je smartphone. Warm wit tot koel daglicht.",
    category: Category.HOME,
    image: "https://picsum.photos/seed/lamp/600/600",
    rating: 4.7
  },
  {
    id: 4,
    name: "Mechanisch Toetsenbord",
    price: 159.00,
    description: "Compact mechanisch toetsenbord met RGB-verlichting en aanpasbare switches.",
    category: Category.TECH,
    image: "https://picsum.photos/seed/keyboard/600/600",
    rating: 4.9
  },
  {
    id: 5,
    name: "Leren Kaarthouder",
    price: 45.00,
    description: "Handgemaakte leren kaarthouder voor de minimalistische reiziger.",
    category: Category.FASHION,
    image: "https://picsum.photos/seed/wallet/600/600",
    rating: 4.6
  },
  {
    id: 6,
    name: "Espressomachine",
    price: 549.00,
    description: "Breng de barista-ervaring naar huis met deze compacte maar krachtige machine.",
    category: Category.HOME,
    image: "https://picsum.photos/seed/coffee/600/600",
    rating: 4.9
  },
  {
    id: 7,
    name: "Draadloze Speaker",
    price: 199.00,
    description: "Krachtig 360-graden geluid in een compact, draagbaar jasje.",
    category: Category.TECH,
    image: "https://picsum.photos/seed/speaker/600/600",
    rating: 4.4
  },
  {
    id: 8,
    name: "Wollen Sjaal",
    price: 65.00,
    description: "Zachte, warme sjaal van 100% duurzame merinowol.",
    category: Category.FASHION,
    image: "https://picsum.photos/seed/scarf/600/600",
    rating: 4.7
  }
];
