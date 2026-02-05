
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag size={24} />
              Winkelwagen
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-500 font-medium">Je winkelwagen is leeg</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-indigo-600 font-semibold hover:underline"
                >
                  Start met shoppen
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-50 text-gray-600 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-50 text-gray-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-1">
                <p>Subtotaal</p>
                <p>€{total.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">Verzendkosten worden berekend bij checkout.</p>
              <button className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]">
                Afrekenen
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
