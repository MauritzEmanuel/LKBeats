import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Beat } from "@/types/beat";
import {HashLoader} from "react-spinners";
import { useCart } from "@/context/cartContext";

type BeatListProps = {
    onPlay: (beat: Beat) => void;
}

export const BeatList = ({onPlay}: BeatListProps) => {
    const [ beats, setBeats ] = useState<Beat[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { cartItems, addToCart } = useCart();

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;
        const children = Array.from(container.children) as HTMLElement[];

        const firstVisibleIndex = children.findIndex(child => {
            const rect = child.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            return rect.right > containerRect.left + 1;
        });

        const width = window.innerWidth;
        let step;
        if (width <= 640) {
            step = 1; // mobile
        } else if (width <= 1024) {
            step = 4; // tablet
        } else {
            step = 7; // desktop
        }


        let targetIndex = direction === 'left' ? firstVisibleIndex - step : firstVisibleIndex + step;
        targetIndex = Math.max(0, Math.min(children.length - 1, targetIndex));

        const targetChild = children[targetIndex];
        if (targetChild) {
            targetChild.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    };

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

    const isInCart = (beatId: number) => {
        return cartItems.some(item => item.id === beatId);
    };

    return(
        <div className="relative w-full max-w-screen-xl mx-auto flex items-center justify-between">
            <button
                onClick={() => scroll('left')}
                className="cursor-pointer opacity-20 hover:opacity-100 h-20"
            >
                <ArrowLeftCircleIcon className="h-20 w-20"/>
            </button>

            {beats.length > 0 ? 
            <div ref={scrollRef} className="flex flex-row scroll-px-2 max-sm:scroll-px-4 max-sm:pl-50 max-lg:scroll-px-4 max-lg:pl-10  pl-2 py-5 gap-9 mt-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
                {beats.map(beat => (
                    <div key={beat.id} className="flex snap-start flex-shrink-0 flex-col items-center outline-3 outline-primary w-48 max-sm:w-48 max-lg:w-42 h-75 rounded-xl">
                        <div className="relative w-38 h-38 mt-5 group">
                            <img
                            src={beat.image_url}
                            alt="Cover"
                            className="w-full h-full object-cover rounded-2xl select-none"
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
                        {isInCart(beat.id) ? (
                            <div className="w-40 h-10 bg-green-500 text-white font-semibold rounded-3xl mt-auto mb-5 flex items-center justify-center transform transition-all duration-300 ease-in-out scale-100">
                                <CheckCircleIcon className="w-6 h-6 mr-2" />
                                Added
                            </div>
                        ) : (
                            <button 
                                onClick={() => addToCart(beat)}
                                className="w-40 h-10 bg-[#2DCEF6] text-white font-semibold rounded-3xl mt-auto mb-5 cursor-pointer hover:bg-[#2DCEF6]/90 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-105 select-none"
                            >
                                Add to cart
                            </button>
                        )}
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