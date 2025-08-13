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


  return (
    <div className="flex flex-col items-center">
      {/*<h1 className="font-jacq text-center text-5xl mt-14 underline underline-offset-7">Tracks</h1>*/}
      <div className="w-85 h-40 mt-4 overflow-hidden flex items-center">
        <img
          src="/images/FeaturedTracksImage.png"
          alt="Tracks"
        />
      </div>
      <BeatList onPlay={handlePlay}/>


      <h1 className="font-jacq text-center text-5xl mt-14">Want to order a beat?</h1>
      <div className="h-15 w-60 rounded-4xl flex items-center justify-center mt-7 cursor-pointer transition-all duration-400 bg-[length:200%_100%] bg-right hover:bg-left"
      onClick={() => router.push("/contact")}
      style={{
        backgroundImage: "linear-gradient(to right, #C61ED9 0%, #C61ED9 50%, #B20050 51%, #B20050 100%)"

      }}>
        <h1 className="text-center font-jacq text-white text-3xl">Contact Me</h1>
      </div>

      <div className="mt-18 flex w-[90%] h-60 bg-secondary rounded-2xl items-center gap-5 outline-2 outline-primary">
        <div className="h-50 w-50 rounded-xl outline-2 outline-primary ml-5">
          <img src="/images/LuddeSmoke.jpg" alt="Ludde Pic" className="w-full h-full rounded-xl object-cover object-[center_30%]"/>
        </div>
        <div className="w-[70%]">
          <p className="italic text-xl text-white font-serif font-bold">
            "I started producing music out of curiosity — today, it’s who I am. Every track is a step closer to perfection."
          </p>
          <p className="text-xl text-white font-serif font-bold">— Ludde K</p>
        </div>
      </div>
      <h1 className="text-4xl my-3">|</h1>
      <button onClick={() => router.push("/credits")} className="w-35 h-12 mt-2 bg-primary text-lg text-white font-semibold rounded-xl cursor-pointer hover:opacity-80">About Ludde K</button>

      <div className="mt-50"></div>
      {selectedBeat && <CustomPlayer beat={selectedBeat} onClose={() => setSelectedBeat(null)}/>}
    </div>
  );
}
