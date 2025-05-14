'use client'

import React from "react";
import { motion } from "framer-motion";

console.log("motion", motion);

export default function Credits() {


    return(
        <motion.div className="flex items-center justify-center flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}>
            <h1 className="text-2xl font-semibold font-serif mt-5 mb-2 underline underline-offset-7">About Ludde K</h1>
            <div className="relative bg-[url('/images/LuddeWater.jpg')] bg-cover bg-center h-54 w-full flex justify-center items-center">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-white p-4 flex justify-center">
                    <p className="text-white text-center text-lg">
                        Ludde K is an educated producer, mixer and songwriter based in Uppsala, Sweden.<br/>
                        Ludde started producing in 2019 and has actively evolved since, he is now educated and featured on multiple spotify tracks.<br/>
                        Ludde is mostly known for his work on multiple of Mauritz tracks, sush as "Tabletten" which he produced.<br/>
                    </p>
                </div>
            </div>

            <h1 className="text-2xl font-semibold font-serif mt-5 mb-2 underline underline-offset-7">Produced by Ludde K</h1>
            <div className="relative bg-[url('/images/DomkyrkanUnder.jpg')] bg-cover bg-center h-84 w-full flex justify-center items-center">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-white flex items-center justify-around w-full">

                    {/*Mauritz*/}
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-xl">
                            <img 
                            src="images/Omslag_Skam.jpg"
                            alt="Cover"
                            className="w-full h-full object-cover rounded-2xl outline-1 outline-secondary" />
                        </div>
                        <h1>Tabletten by Mauritz</h1>
                        <a
                        href="https://open.spotify.com/track/0uvXCy5UDL20AyX2RsjApg?si=595a7236de984bb7"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <img src="images/Listen_on_spotify.png" alt="listen on spotify"
                            className="w-35" />
                        </a>
                    </div>

                    {/*Spotify*/}
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-xl">
                            <img 
                            src="/images/SpaceMadeART.png"
                            alt="Cover"
                            className="w-full h-full object-cover rounded-2xl outline-1 outline-secondary" />
                        </div>
                        <h1>My Spotify</h1>
                        <a
                        href="https://open.spotify.com/artist/2jK9Z5TtYz9FxObE5NNGBz?si=YkUfH-Y_RtKpUwZEMOdQbg"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <img src="images/Listen_on_spotify.png" alt="listen on spotify"
                            className="w-35" />
                        </a>
                    </div>

                    {/*SoundCloud*/}
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-xl bg-black">
                            <img 
                            src="/images/Logo.png"
                            alt="Cover"
                            className="w-full h-full object-cover rounded-2xl outline-1 outline-secondary" />
                        </div>
                        <h1>My Souncloud</h1>
                        <a
                        href="https://on.soundcloud.com/MvDGRGWgbDegZyPx9"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <img src="images/Listen_on_soundcloud.png" alt="listen on souncloud"
                            className="w-35"/>
                        </a>
                    </div>
                    
                </div>
            </div>
        </motion.div>
    )
}