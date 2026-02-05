
import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Sparkles, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { getProductInsight } from '../services/geminiService';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      const fetchInsight = async () => {
        setLoading(true);
        const text = await getProductInsight(product.name, product.description);
        setInsight(text);
        setLoading(false);
      };
      fetchInsight();
    } else {
      setInsight(null);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-up flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full shadow-md text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="md:w-1/2 overflow-hidden bg-gray-100 h-64 md:h-auto">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6 sm:p-10 overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
              <Star size={16} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h2>
          
          <div className="text-3xl font-bold text-indigo-600 mb-6">
            €{product.price.toFixed(2)}
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">Beschrijving</h4>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-3 text-indigo-700 font-bold text-sm">
                <Sparkles size={18} />
                <span>AI Insight</span>
              </div>
              {loading ? (
                <div className="flex items-center gap-3 text-indigo-400 py-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span className="text-sm font-medium italic">Inzichten genereren...</span>
                </div>
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{insight}"
                </p>
              )}
            </div>

            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <ShoppingCart size={20} />
              Toevoegen aan winkelwagen
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-up { animation: scale-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default ProductModal;
