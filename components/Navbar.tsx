
import React from 'react';
import { ShoppingBag, Search, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-600">NOVASHOP</h1>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Nieuw</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Bestsellers</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Collecties</a>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
            <User size={20} />
          </button>
          <button 
            onClick={onOpenCart}
            className="group relative p-2 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
