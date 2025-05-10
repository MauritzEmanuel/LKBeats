'use client'
import { BeatList } from "@/components/beatList";
import { CustomPlayer } from "@/components/player";
import { Beat } from "@/types/beat";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);

  const handlePlay = (beat: Beat) => {
    setSelectedBeat(beat);
  }

  const router = useRouter()

  const handleClick = () => {
    router.push("/contact");
  };


  return (
    <div className="flex flex-col items-center">
      <h1 className="font-jacq text-center text-5xl mt-14">Featured Tracks</h1>
      <BeatList onPlay={handlePlay}/>


      <h1 className="font-jacq text-center text-5xl mt-14">Want to order a beat?</h1>
      <div className="h-15 w-60 rounded-4xl flex items-center justify-center mt-7 cursor-pointer"
      onClick={handleClick}
      style={{
        backgroundImage: 'linear-gradient(to right, #C61ED9, #B20050 88%)',
      }}>
        <h1 className="text-center font-jacq text-white text-3xl">Contact Me</h1>
      </div>

      <div className="mt-50"></div>
      {selectedBeat && <CustomPlayer beat={selectedBeat} onClose={() => setSelectedBeat(null)}/>}
    </div>
  );
}
