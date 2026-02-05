
import React, { useState, useMemo } from 'react';
import { products } from './data/products';
import { Product, CartItem, Category } from './types';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import { Filter, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);

  const filteredProducts = useMemo(() => {
    if (activeCategory === Category.ALL) return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: show small toast or open cart
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeCartItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartTotalItems} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Ontdek onze <span className="text-indigo-600">Premium</span> Collectie
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Van de nieuwste tech tot tijdloze mode, wij selecteren alleen de allerbeste producten voor jouw moderne levensstijl.
          </p>
        </section>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-2 sm:pb-0">
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
              <Filter size={18} />
              Sorteer op
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onOpenDetails={setSelectedProduct}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-indigo-600 mb-2">NOVASHOP</h1>
            <p className="text-sm text-gray-500 italic">De toekomst van winkelen, vandaag.</p>
          </div>
          <div className="flex gap-8 text-sm font-semibold text-gray-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Over ons</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Klantenservice</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacybeleid</a>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NovaShop. Alle rechten voorbehouden.
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeCartItem}
      />

      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;
