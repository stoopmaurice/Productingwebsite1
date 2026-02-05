
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Category {
  ALL = 'Alle',
  ELECTRONICS = 'Elektronica',
  FASHION = 'Mode',
  HOME = 'Huis & Wonen',
  TECH = 'Gadgets'
}
