import { Beat } from "@/types/beat";
import React, { useEffect, useRef, useState } from "react";
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";

type customPlayerProps = {
    beat: Beat;
    onClose: () => void;
};

export const CustomPlayer = ({ beat, onClose }: customPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const inactivityRef = useRef<NodeJS.Timeout | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.75);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      handlePlay();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isPlaying]);

    const handlePlay = () => {
        if (isPlaying){
            audioRef.current?.pause()
            setIsPlaying(false)
        }
        else{
            audioRef.current?.play()
            setIsPlaying(true)
        }   
    }

    const handleMute = () => {
        if(audioRef.current){
            const nextMuted = !audioRef.current.muted;
            audioRef.current.muted = nextMuted;
            setIsMuted(nextMuted);
        }
            
    }

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current)
            audioRef.current.volume = newVolume;
    }

    useEffect(() => {
        if(!isPlaying){
            inactivityRef.current = setTimeout(() => {
                onClose();
            }, 10000)
        }
        else {
            if (inactivityRef.current) {
            clearTimeout(inactivityRef.current);
            inactivityRef.current = null;
            }
        }

        return () => {
            if (inactivityRef.current) clearTimeout(inactivityRef.current);
        };
    }, [isPlaying])


    if(!beat) return null;

    return(
        <div style={{
            boxShadow: '0px 0px 20px rgba(198, 30, 217, 0.6)'
        }} className="fixed flex justify-between items-center bottom-5 w-120 max-sm:w-80 h-15 mx-auto bg-white rounded-2xl animate-[fadeUp_0.3s_ease-out]">
            <audio ref={audioRef} src={beat.audio_url} autoPlay/>
            <div className="h-[100%] w-[40%] flex flex-row items-center">
                <img className="aspect-square object-cover h-[75%] mx-3 rounded" src={beat.image_url} 
                    style={{
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
                    }}
                />
                <div className="flex flex-col">
                    <h1 className="text-green-400 text-sm hidden sm:block">Now playing</h1>
                    <h1 className="text-green-400 text-xs block sm:hidden">Playing</h1>
                    <h1 className="font-medium max-sm:text-xs">{beat.title}</h1>
                </div>
            </div>
            
            <button onClick={handlePlay} className="w-[20%] flex items-center justify-center cursor-pointer">
                {
                    isPlaying ?
                    <PauseIcon className=" w-10 h-10"/> 
                    : 
                    <PlayIcon className=" w-10 h-10"/>
                }
            </button>
            <div className="h-[80%] w-[40%] flex justify-end">
                <button onClick={handleMute} className="cursor-pointer">
                    {!isMuted ? <SpeakerWaveIcon className="h-7 w-7 mr-2"/> : <SpeakerXMarkIcon className="h-7 w-7 mr-2"/>}
                </button>
                <input 
                className="w-20 max-sm:w-13 mr-3"
                value={volume}
                onChange={handleVolume}
                type="range"
                min="0"
                max="1"
                step="0.01"
                />
            </div>
        </div>
    )
}