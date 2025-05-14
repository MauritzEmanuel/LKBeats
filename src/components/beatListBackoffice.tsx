'use client'

import { supabase } from "@/lib/supabase";
import { Beat } from "@/types/beat";
import React, { useEffect, useState } from "react";
import { UpdateModal } from "./updateModal";

export const BeatListBackoffice = () => {
    const [beats, setBeats] = useState<Beat[]>([]);
    const [load, setLoad] = useState(true);
    const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);


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

            const audioPath = beat.audio_path ? decodeURIComponent(beat.audio_path) : null;
            const imagePath = beat.image_path ? decodeURIComponent(beat.image_path) : null;

            console.log("Decoded Audio path:", `"${audioPath}"`);
            console.log("Decoded Image path:", `"${imagePath}"`);

            if (audioPath) {
                const { error: audioError, data: audioData } = await supabase
                    .storage
                    .from('beat-audio')
                    .remove([audioPath]);

                console.log("Audio delete result:", audioData);

                if (audioError) {
                    console.error("Failed to delete audio:", audioError.message);
                    throw new Error("Audio deletion failed");
                }
            }

            if (imagePath) {
                const { error: imageError, data: imageData } = await supabase
                    .storage
                    .from('beat-images')
                    .remove([imagePath]);

                console.log("Image delete result:", imageData);

                if (imageError) {
                    console.error("Failed to delete image:", imageError.message);
                    throw new Error("Image deletion failed");
                }
            }

            const {error} = await supabase.from('beat_items').delete().eq('id', beat.id);
            if (error) throw error;
            
            console.log("File deleted successfully!");
            setLoad(true);
        }
        catch(err){
            console.error("Failed to delete beat file:", err);
        }

    }

    const handleUpdate = async (newTitle: string, newPrice: number) => {
        if (!selectedBeat) return;

        const { error } = await supabase
            .from("beat_items")
            .update({
            title: newTitle,
            price: newPrice,
            })
            .eq("id", selectedBeat.id);

        if (error) {
            console.error("Failed to update beat:", error);
        } else {
            console.log("Beat updated successfully.");
            setLoad(true);
            setSelectedBeat(null);
        }
    };

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
                <p>{decodeURIComponent(beat.audio_url.split('/').pop()?.split('-').slice(1).join('-') ?? '')}</p>
                <div className="flex justify-center gap-3">
                <button onClick={() => setSelectedBeat(beat)} className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-300 text-white text-sm cursor-pointer">Update</button>
                <button onClick={() => handleDelete(beat)} className="px-3 py-1 rounded bg-red-500 hover:bg-red-400 text-white text-sm cursor-pointer">Delete</button>
                </div>
            </div>
            ))}
            {selectedBeat && (
            <UpdateModal
                beat={selectedBeat}
                onClose={() => setSelectedBeat(null)}
                onSave={handleUpdate}
            />
            )}
        </div>
    );
}