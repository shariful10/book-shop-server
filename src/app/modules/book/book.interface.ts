export type TCategory =
  | "Fiction"
  | "Science"
  | "SelfDevelopment"
  | "Poetry"
  | "Religious";

export type TBook = {
  title: string;
  author: string;
  price: number;
  thumbnail?: string;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
