import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

type Beat = {
    id: number;
    title: string;
    price: number;
    image_url: string;
    audio_url: string;
  };

export const BeatList = () => {
    const [ beats, setBeats ] = useState<Beat[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if(!scrollRef.current) return;

        const firstBeat = scrollRef.current.children[0].nextElementSibling as HTMLElement;

        if (!firstBeat) return;

        const cardWidth = firstBeat.offsetWidth + 40;

        scrollRef.current.scrollBy({
            left: direction === 'left' ? -cardWidth : cardWidth,
            behavior: "smooth",
        });

    }

    useEffect(() => {
        const fetchData = async () => {
            const respone = await fetch('/api/beats');
            const data = await respone.json();
            setBeats(data)
        }

        fetchData();
    }, [])

    return(
        <div className="relative w-full max-w-screen-xl mx-auto">
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-20 hover:opacity-100"
            >
                <ArrowLeftCircleIcon className="h-20 w-20"/>
            </button>

            <div ref={scrollRef} className="flex flex-row scroll-px-2 pl-2 py-5 gap-10 mt-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
                {beats.map(beat => (
                    <div key={beat.id} className="flex snap-center flex-shrink-0 flex-col items-center outline-3 outline-primary w-55 h-85 rounded-xl">
                        <div className="relative w-45 h-45 mt-5 group">
                            <img
                            src={beat.image_url}
                            alt="Cover"
                            className="w-full h-full object-cover rounded-2xl"
                            />
                            <button
                            onClick={() => console.log("Spela upp:", beat.audio_url)}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <PlayCircleIcon className="w-16 h-16 text-primary drop-shadow-lg" />
                            </button>
                        </div>
                        <div className="w-full ml-15 mt-1">
                            <h1 className="text-xl font-semibold">{beat.title}</h1>
                        </div>
                        <div className="w-full ml-15">
                            <h1 className="text-l font-medium">{beat.price} SEK</h1>
                        </div>
                        <button className="w-40 h-10 bg-[#2DCEF6] text-white font-semibold rounded-3xl mt-auto mb-5 cursor-pointer">Add to cart</button>
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-20 hover:opacity-100"
            >
                <ArrowRightCircleIcon className="h-20 w-20"/>
            </button>
        </div>
    )
}