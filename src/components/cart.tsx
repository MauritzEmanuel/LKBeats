import React from 'react';
import { Beat } from '@/types/beat';
import { XMarkIcon } from '@heroicons/react/24/outline';

type CartProps = {
    isOpen: boolean;
    onClose: () => void;
    items: Beat[];
    onRemoveItem: (beatId: number) => void;
}

export const Cart = ({ isOpen, onClose, items, onRemoveItem }: CartProps) => {
    if (!isOpen) return null;

    return (
        <div className="bg-black/50 w-full h-full z-40 fixed" onClick={onClose}>
            <div className="fixed top-0 right-0 h-full max-sm:w-80 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 mb-4 p-2 hover:bg-gray-50 rounded-lg">
                                <img 
                                    src={item.image_url} 
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-medium">{item.title}</h3>
                                    <p className="text-gray-600">{item.price} SEK</p>
                                </div>
                                <button 
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
                        <div className="flex justify-between mb-4">
                            <span className="font-semibold">Total:</span>
                            <span className="font-semibold">
                                {items.reduce((sum, item) => sum + item.price, 0)} SEK
                            </span>
                        </div>
                        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}; 