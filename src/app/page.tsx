'use client'
import { BeatList } from "@/components/beatList";
import { CustomPlayer } from "@/components/player";
import { Beat } from "@/types/beat";
import { easeOut, motion } from "framer-motion";
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
      <div className="w-85 h-40 mt-4 overflow-hidden flex items-center">
        <img
          src="/images/FeaturedTracksImage.png"
          alt="Tracks"
        />
      </div>
      <BeatList onPlay={handlePlay}/>
      <p className="mt-2 text-sm opacity-40 hidden max-lg:block">Tap on cover to play beat</p>

      <div className="mt-14 flex flex-col justify-center items-center outline-3 rounded-4xl outline-violet-400 py-4 lg:p-5 shadow-[0_0_20px] shadow-violet-700">
        <h1 className="font-jacq text-center text-5xl max-sm:text-4xl">Want to order a beat?</h1>
        <div className="h-15 w-60 rounded-4xl flex items-center justify-center mt-7 cursor-pointer transition-all transition-200 lg:duration-400 bg-[length:200%_100%] bg-right hover:bg-left active:scale-110 active:bg-left hover:scale-105 select-none"
        onClick={() => router.push("/contact")}
        style={{
          backgroundImage: "linear-gradient(to right, #C61ED9 0%, #C61ED9 50%, #B20050 51%, #B20050 100%)"

        }}>
          <h1 className="text-center font-jacq text-white text-3xl">Contact Me</h1>
        </div>
      </div>
      

      <div className="mt-18 flex w-[90%] h-60 bg-secondary rounded-2xl items-center gap-5 outline-2 outline-primary">
        <div className="h-50 w-50 rounded-xl outline-2 outline-primary ml-5">
          <img src="/images/LuddeSmoke.jpg" alt="Ludde Pic" className="w-full h-full rounded-xl object-cover object-[center_30%]"/>
        </div>
        <div className="w-[70%]">
          <motion.p className="italic text-xl max-sm:text-base text-white font-serif font-bold"
          initial={{x: 20, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          transition={{duration: 0.5, ease: easeOut}}>
            &quot;I started producing music out of curiosity — today, it’s who I am. Every track is a step closer to perfection.&quot;
          </motion.p>
          <motion.p className="text-xl text-white font-serif font-bold"
          initial={{x: 30, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          transition={{duration: 1.5, ease: easeOut}}>— Ludde K</motion.p>
        </div>
      </div>
      <h1 className="text-4xl my-3">|</h1>
      <button onClick={() => router.push("/credits")} className="w-35 h-12 mt-2 bg-primary text-lg text-white font-semibold rounded-xl cursor-pointer hover:opacity-80 active:scale-105 select-none">
        About Ludde K
      </button>

      <div className="mt-50"></div>
      {selectedBeat && <CustomPlayer beat={selectedBeat} onClose={() => setSelectedBeat(null)}/>}
    </div>
  );
}
