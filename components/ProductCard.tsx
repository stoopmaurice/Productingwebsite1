
import React from 'react';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onOpenDetails: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onOpenDetails }) => {
  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
      <div 
        className="aspect-square w-full overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-2 bg-white text-indigo-600 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
            <Star size={14} fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 
          className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
          onClick={() => onOpenDetails(product)}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            €{product.price.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
          </p>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-900 text-sm font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
          >
            <ShoppingCart size={16} />
            <span>Bestel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
