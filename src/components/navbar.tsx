'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

type NavProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const Navbar = ({isOpen, onClose}: NavProps) => {
    if (!isOpen) return null;

    const router = useRouter();

    return(
        <div className="h-full w-full bg-white shadow-lg fixed left-0 top-0 z-50">
            <div className="flex flex-col w-full h-full">
                <div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <motion.div
                className="h-full flex flex-col items-center justify-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}>
                    <div className="w-60 h-10 rounded-xl outline-2 outline-primary flex items-center justify-center" onClick={() => {
                        router.push('/')
                        onClose()}}>
                        <p className="text-xl font-semibold">Home</p>
                    </div>
                    <div className="w-60 h-10 rounded-xl outline-2 outline-primary flex items-center justify-center" onClick={() => {
                        router.push('/beats')
                        onClose()}}>
                        <p className="text-xl font-semibold">Beats</p>
                    </div>
                    <div className="w-60 h-10 rounded-xl outline-2 outline-primary flex items-center justify-center" onClick={() => {
                        router.push('/contact')
                        onClose()}}>
                        <p className="text-xl font-semibold">Contact</p>
                    </div>
                    <div className="w-60 h-10 rounded-xl outline-2 outline-primary flex items-center justify-center" onClick={() => {
                        router.push('/credits')
                        onClose()}}>
                        <p className="text-xl font-semibold">Credits</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}