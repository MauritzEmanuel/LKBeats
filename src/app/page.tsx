'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const handleClick = () => {
    router.push("/contact");
  };


  return (

    <div className="flex flex-col items-center">
      <h1 className="font-jacq text-center text-5xl mt-14">Featured Tracks</h1>


      <h1 className="font-jacq text-center text-5xl mt-14">Want to order a beat?</h1>
      <div className="h-15 w-60 rounded-4xl flex items-center justify-center mt-7 cursor-pointer"
      onClick={handleClick}
      style={{
        backgroundImage: 'linear-gradient(to right, #C61ED9, #B20050 88%)',
      }}>
        <h1 className="text-center font-jacq text-white text-3xl">Contact Me</h1>
      </div>
    </div>
  );
}
