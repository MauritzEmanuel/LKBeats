'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

type NavProps = {
    isOpen: boolean;
    onClose: () => void;
}

const navVariants = {
  open: {
    transition: { staggerChildren: 0.09 }
  },
  closed: {}
};

const itemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -20 }
};

export const Navbar = ({isOpen, onClose}: NavProps) => {
    const router = useRouter();
    if (!isOpen) return null;

    const menuItems = [
        {name: 'Home', path: '/', color: 'outline-violet-500'},
        {name: 'Beats', path: '/', color: 'outline-violet-600'},
        {name: 'Contact', path: '/contact', color: 'outline-violet-700'},
        {name: 'Credits', path: '/credits', color: 'outline-violet-800'}
    ]

    return(
        <div className="bg-black/50 w-full h-full z-40 fixed" onClick={onClose}>
            <motion.div className="h-full w-[80%] md:w-[40%] lg:w-[25%] bg-white shadow-lg fixed left-0 top-0 z-50 shadow-primary"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.2, ease: "easeInOut"}}>
                <div className="flex flex-col w-full h-full">
                    <div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full mt-1 ml-1">
                            <XMarkIcon className="w-8 h-8" />
                        </button>
                    </div>
                    <motion.nav
                    className="h-full flex flex-col items-center justify-center gap-5"
                    initial="closed"
                    animate="open"
                    variants={navVariants}>
                        {menuItems.map((item, i) => (
                            <motion.li
                            key={i}
                            variants={itemVariants}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="list-none text-white text-xl">
                                <div className={`w-60 h-10 hover:scale-110 active:scale-120 duration-300 ease-in-out cursor-pointer rounded-xl outline-2 ${item.color} flex items-center justify-center select-none`} onClick={() => {
                                router.push(item.path)
                                onClose()}}>
                                    <p className="text-xl font-semibold text-black">{item.name}</p>
                                </div>
                            </motion.li>
                        ))}
                    </motion.nav>
                </div>
            </motion.div>
        </div>
    )
}