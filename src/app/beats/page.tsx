'use client'

import React, { useEffect, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { Beat } from "@/types/beat";
import { HashLoader } from "react-spinners";

export default function BeatsPage() {
    const [beats, setBeats] = useState<Beat[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/beats');
            const data = await response.json();

            const sorted = data.sort(
                (a: Beat, b: Beat) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            setBeats(sorted);
        }

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-8">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">All Beats</h1>
                
                {beats.length > 0 ? (
                    <div className="grid grid-cols-5 gap-6">
                        {beats.map(beat => (
                            <div key={beat.id} className="flex flex-col items-center bg-black/30 p-4 rounded-xl hover:bg-black/40 transition-all">
                                <div className="relative w-full aspect-square group">
                                    <img
                                        src={beat.image_url}
                                        alt={beat.title}
                                        className="w-full h-full object-cover rounded-2xl"
                                        style={{
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
                                        }}
                                    />
                                    <button
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <PlayCircleIcon className="w-16 h-16 text-primary drop-shadow-lg" />
                                    </button>
                                </div>
                                <div className="w-full mt-3">
                                    <h2 className="text-lg font-semibold text-white">{beat.title}</h2>
                                    <p className="text-sm text-gray-300">{beat.price} SEK</p>
                                </div>
                                <button className="w-full h-10 bg-[#2DCEF6] text-white font-semibold rounded-3xl mt-4 hover:bg-[#25b6da] transition-colors">
                                    Add to cart
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center mt-10">
                        <HashLoader 
                            color="#C61ED9"
                            speedMultiplier={2}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
