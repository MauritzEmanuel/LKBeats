'use client'

import BeatForm from "@/components/beatForm";
import { BeatListBackoffice } from "@/components/beatListBackoffice";
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation";
import React from "react"

export default function BackOffice() {

    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
        console.error('Error during logout:', error.message)
        return
        }

        await fetch('/api/auth/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            event: 'SIGNED_OUT',
            session: null,
            }),
        });
        router.push('/login')
    }

    return(
        <div className="flex flex-col justify-center items-center">

            <div className="my-5">
                <BeatForm/>
            </div>

            <div className="mb-5">
                <BeatListBackoffice/>
            </div>
            
            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer mb-5"
            >
                Log out
            </button>
        </div>
    )
}