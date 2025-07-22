import { Link } from "wouter";

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer">
        <div className="aspect-square overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}