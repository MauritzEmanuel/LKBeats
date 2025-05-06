'use client'

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

        document.cookie = 'supabase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        router.push('/login')
    }

    return(
        <div>
            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Logga ut
            </button>
        </div>
    )
}