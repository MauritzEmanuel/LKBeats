'use client'

import { supabase } from "@/lib/supabase";
import { Beat } from "@/types/beat";
import React, { useEffect, useState } from "react";

export const BeatListBackoffice = () => {
    const [beats, setBeats] = useState<Beat[]>([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const respone = await fetch('/api/beats');
            const data = await respone.json();

            setBeats(data)
            setLoad(false)
        }

        fetchData();
    }, [load]);

    const handleDelete = async (beat: Beat) => {
        try{
            if(!beat) return;

            const {error} = await supabase.from('beat_items').delete().eq('id', beat.id);
            if (error) throw error;
            
            console.log("File deleted successfully!");
            setLoad(true);
        }
        catch(err){
            console.error("Failed to delete beat file:", err);
        }

    }

    return (
        <div className="w-full mt-6">
            <div className="grid grid-cols-4 font-semibold border-b border-gray-300 pb-2 mb-2">
            <h2>Title</h2>
            <h2>Price</h2>
            <h2>Audio File</h2>
            <h2 className="text-center">Actions</h2>
            </div>
            {beats.map((beat) => (
            <div key={beat.id} className="grid grid-cols-4 items-center border-b border-gray-200 py-2">
                <p>{beat.title}</p>
                <p>{beat.price}</p>
                <p>{beat.audio_url.split('/').pop()?.split('-').slice(1).join('-')}</p>
                <div className="flex justify-center gap-3">
                <button className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-300 text-white text-sm cursor-pointer">Update</button>
                <button onClick={() => handleDelete(beat)} className="px-3 py-1 rounded bg-red-500 hover:bg-red-400 text-white text-sm cursor-pointer">Delete</button>
                </div>
            </div>
            ))}
        </div>
    );
}