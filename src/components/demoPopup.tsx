'use client'

import { useEffect, useState } from "react";

export const DemoPopup = () => {
    const [accepted, setAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasAccepted = sessionStorage.getItem("demo_notice_accepted");
        if(hasAccepted === "true"){
        setAccepted(true);
        }
        setIsLoading(false);
    }, [])

    const handleAccept = () => {
        sessionStorage.setItem("demo_notice_accepted", "true");
        setAccepted(true);
    }

    if (accepted || isLoading) return null;

    return(
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-white/30 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full text-center mx-4">
                <h2 className="text-2xl font-bold mb-4">Demo Notice</h2>
                <p>
                This website is currently in <strong>demo mode</strong> and no real purschase can be made.
                </p>
                <p className="mb-4">
                    All rights to the audio files and images on this site are reserved.
                </p>
                <p className="text-red-600 font-semibold mb-6">
                Unauthorized use of any content will result in action being taken.
                </p>
                <button
                onClick={handleAccept}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
                >
                I Understand
                </button>
            </div>
        </div>
    );
}