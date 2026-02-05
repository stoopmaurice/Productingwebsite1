
import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  ShoppingBag, Search, User, Star, ShoppingCart, 
  Plus, Minus, X, Trash2, Sparkles, Loader2, Filter, ChevronDown 
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TYPES ---
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

enum Category {
  ALL = 'Alle',
  ELECTRONICS = 'Elektronica',
  FASHION = 'Mode',
  HOME = 'Huis & Wonen',
  TECH = 'Gadgets'
}

// --- DATA ---
const products: Product[] = [
  { id: 1, name: "Luxe Draadloze Koptelefoon", price: 299.00, description: "Premium geluidskwaliteit met actieve ruisonderdrukking. Perfect voor werk en ontspanning.", category: Category.TECH, image: "https://picsum.photos/seed/headphones/600/600", rating: 4.8 },
  { id: 2, name: "Minimalistische Rugzak", price: 89.95, description: "Een stijlvolle, waterbestendige rugzak met een speciaal vak voor je 15-inch laptop.", category: Category.FASHION, image: "https://picsum.photos/seed/backpack/600/600", rating: 4.5 },
  { id: 3, name: "Slimme Wandlamp", price: 124.50, description: "Moderne verlichting die je kunt bedienen met je smartphone.", category: Category.HOME, image: "https://picsum.photos/seed/lamp/600/600", rating: 4.7 },
  { id: 4, name: "Mechanisch Toetsenbord", price: 159.00, description: "Compact mechanisch toetsenbord met RGB-verlichting.", category: Category.TECH, image: "https://picsum.photos/seed/keyboard/600/600", rating: 4.9 },
  { id: 5, name: "Leren Kaarthouder", price: 45.00, description: "Handgemaakte leren kaarthouder voor de minimalistische reiziger.", category: Category.FASHION, image: "https://picsum.photos/seed/wallet/600/600", rating: 4.6 },
  { id: 6, name: "Espressomachine", price: 549.00, description: "Breng de barista-ervaring naar huis.", category: Category.HOME, image: "https://picsum.photos/seed/coffee/600/600", rating: 4.9 },
  { id: 7, name: "Draadloze Speaker", price: 199.00, description: "Krachtig 360-graden geluid in een compact jasje.", category: Category.TECH, image: "https://picsum.photos/seed/speaker/600/600", rating: 4.4 },
  { id: 8, name: "Wollen Sjaal", price: 65.00, description: "Zachte, warme sjaal van 100% duurzame merinowol.", category: Category.FASHION, image: "https://picsum.photos/seed/scarf/600/600", rating: 4.7 }
];

// --- AI SERVICE ---
const getProductInsight = async (productName: string, description: string): Promise<string> => {
  const apiKey = (window as any).process?.env?.API_KEY || '';
  if (!apiKey) return "Dit is een van onze meest populaire keuzes deze maand!";
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Schrijf een korte verleidelijke zin waarom iemand de "${productName}" nodig heeft. Max 20 woorden.`,
    });
    return response.text || "Perfect voor een moderne levensstijl.";
  } catch (e) { return "Kwaliteit en design in één product."; }
};

// --- COMPONENTS ---

const Navbar = ({ cartCount, onOpenCart }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 sm:px-8">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight text-indigo-600">NOVASHOP</h1>
      <div className="flex items-center gap-4">
        <button onClick={onOpenCart} className="group relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </nav>
);

const ProductCard = ({ product, onAddToCart, onOpenDetails }) => (
  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
    <div className="aspect-square overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onOpenDetails(product)}>
      <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] font-bold text-indigo-500 uppercase">{product.category}</span>
        <div className="flex items-center gap-1 text-xs font-bold text-amber-500"><Star size={12} fill="currentColor" />{product.rating}</div>
      </div>
      <h3 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
      <div className="flex items-center justify-between mt-4">
        <span className="font-bold text-lg">€{product.price.toFixed(2)}</span>
        <button onClick={() => onAddToCart(product)} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={18} />
        </button>
      </div>
    </div>
  </div>
);

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <>
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Winkelwagen ({items.length})</h2>
            <button onClick={onClose}><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.image} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 border rounded"><Minus size={12}/></button>
                    <span className="text-sm">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 border rounded"><Plus size={12}/></button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => onRemove(item.id)} className="text-red-400 mt-1"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between font-bold text-lg mb-4"><span>Totaal</span><span>€{total.toFixed(2)}</span></div>
            <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold">Afrekenen</button>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setLoading(true);
      getProductInsight(product.name, product.description).then(res => {
        setInsight(res);
        setLoading(false);
      });
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow"><X size={20}/></button>
        <img src={product.image} className="md:w-1/2 aspect-square object-cover" />
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-indigo-600 font-bold text-xl mb-4">€{product.price.toFixed(2)}</p>
          <p className="text-gray-500 text-sm mb-6">{product.description}</p>
          <div className="bg-indigo-50 p-4 rounded-xl mb-6">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-1"><Sparkles size={14}/> AI TIP</div>
            {loading ? <Loader2 size={16} className="animate-spin text-indigo-300"/> : <p className="text-sm italic">"{insight}"</p>}
          </div>
          <button onClick={() => { onAddToCart(product); onClose(); }} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <ShoppingCart size={18}/> In winkelwagen
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState(Category.ALL);

  const filteredProducts = useMemo(() => 
    activeCategory === Category.ALL ? products : products.filter(p => p.category === activeCategory)
  , [activeCategory]);

  const handleAddToCart = (p) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === p.id);
      if (exists) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Onze <span className="text-indigo-600">Collectie</span></h2>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {Object.values(Category).map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} onOpenDetails={setSelectedProduct} />
          ))}
        </div>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={(id, d) => setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i))}
        onRemove={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
      />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />
    </div>
  );
};

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
