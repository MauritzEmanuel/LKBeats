'use client'

import React, { useState } from "react";
import Image from 'next/image';
import { Bars3Icon } from "@heroicons/react/16/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Cart } from './cart';
import { useCart } from '@/context/cartContext';

export const Header = () => {
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems, removeFromCart } = useCart();

    const Options = [
        {name: "Contact", path: "contact"},
        {name: "Beats", path: "/"},
        {name: "Credits", path: "credits"},
    ];

    return(
        <div className="flex flex-col w-full">
            <div className="w-full bg-primary h-[80px] flex justify-between items-center">
                <Bars3Icon className="size-9 ml-4 text-white"/>
                <Image
                    src="/images/logo.png"
                    alt="Logotyp"
                    width={90}
                    height={90}
                    onClick={() => router.push("/")}
                    className="cursor-pointer"
                />
                <div className="relative">
                    <ShoppingBagIcon 
                        className="size-9 mr-4 cursor-pointer text-white" 
                        onClick={() => setIsCartOpen(true)}
                    />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-1 right-1 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartItems.length}
                        </span>
                    )}
                </div>
            </div>
            <div className="w-full bg-secondary h-[30px] flex justify-center">
                <div className="w-[45%] max-sm:w-[90%] max-lg:w-[60%] h-full justify-between items-center flex flex-row px-6">
                    {Options.map((option => (
                        <div
                            key={option.name}
                            className="h-5.5  w-20 cursor-pointer text-black hover:text-primary bg-white flex justify-center items-center rounded-4xl"
                            onClick={() => router.push(option.path)}>
                            <h3 className="text-center">{option.name}</h3>
                        </div>
                    )))}
                </div>
            </div>
            <Cart 
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onRemoveItem={removeFromCart}
            />
        </div>
    );
}