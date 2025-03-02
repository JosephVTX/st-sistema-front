interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  code: string;
  category_id: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
