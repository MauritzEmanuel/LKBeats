import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { Beat } from "@/types/beat";
import {HashLoader} from "react-spinners";
import { useCart } from "@/context/cartContext";

type BeatListProps = {
    onPlay: (beat: Beat) => void;
}

export const BeatList = ({onPlay}: BeatListProps) => {
    const [ beats, setBeats ] = useState<Beat[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();

    const scroll = (direction: 'left' | 'right') => {
        if(!scrollRef.current) return;

        const firstBeat = scrollRef.current.children[0].nextElementSibling as HTMLElement;

        if (!firstBeat) return;

        const cardWidth = firstBeat.offsetWidth;

        scrollRef.current.scrollBy({
            left: direction === 'left' ? -cardWidth * 5 : cardWidth * 5,
            behavior: "smooth",
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const respone = await fetch('/api/beats');
            const data = await respone.json();

            const sorted = data.sort(
                (a: Beat, b: Beat) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            setBeats(sorted.slice(0, 10))
        }

        fetchData();
    }, [])

    return(
        <div className="relative w-full max-w-screen-xl mx-auto flex items-center justify-between">
            <button
                onClick={() => scroll('left')}
                className="cursor-pointer opacity-20 hover:opacity-100 h-20"
            >
                <ArrowLeftCircleIcon className="h-20 w-20"/>
            </button>

            {beats.length > 0 ? 
            <div ref={scrollRef} className="flex flex-row scroll-px-2 pl-2 py-5 gap-9 mt-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
                {beats.map(beat => (
                    <div key={beat.id} className="flex snap-start flex-shrink-0 flex-col items-center outline-3 outline-primary w-48 h-75 rounded-xl">
                        <div className="relative w-38 h-38 mt-5 group">
                            <img
                            src={beat.image_url}
                            alt="Cover"
                            className="w-full h-full object-cover rounded-2xl"
                            style={{
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
                            }}
                            />
                            <button
                            onClick={() => onPlay(beat)}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <PlayCircleIcon className="w-16 h-16 text-primary drop-shadow-lg" />
                            </button>
                        </div>
                        <div className="w-full ml-11 mt-1">
                            <h1 className="text-lg font-semibold">{beat.title}</h1>
                        </div>
                        <div className="w-full ml-11">
                            <h1 className="text-sm font-small">{beat.price} SEK</h1>
                        </div>
                        <button 
                            onClick={() => addToCart(beat)}
                            className="w-40 h-10 bg-[#2DCEF6] text-white font-semibold rounded-3xl mt-auto mb-5 cursor-pointer hover:bg-[#2DCEF6]/90 transition-colors"
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
            : 
            <div className="flex justify-center items-center mt-10">
                <HashLoader 
                color="#C61ED9"
                speedMultiplier={2}/>
            </div>
            }

            <button
                onClick={() => scroll('right')}
                className="cursor-pointer opacity-20 hover:opacity-100 h-20"
            >
                <ArrowRightCircleIcon className="h-20 w-20"/>
            </button>
        </div>
    )
}