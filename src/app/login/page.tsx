'use client'

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react"

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
    
        console.log("Logging in...");
    
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
    
        console.log("Login result:", { data, error });
    
        if (error) {
            setErrorMsg('Invalid email or password.');
            setIsSubmitting(false);
        } else {
            // Vänta på att sessionen ska sättas
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error('Error fetching session:', sessionError);
                setErrorMsg('Something went wrong when fetching the session.');
            } else {
                console.log('Session after login:', sessionData?.session);
    
                if (sessionData?.session) {
                    // Spara sessionen i cookies via backend
                    await fetch('/api/auth/callback', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            event: 'SIGNED_IN',
                            session: sessionData.session,
                        }),
                    });
                
                    router.push('/backoffice');
                } else {
                    setIsSubmitting(false);
                    setErrorMsg('Session not found after login.');
                }
            }
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center  text-white">
            <form onSubmit={handleLogin} className="bg-black p-8 rounded-xl shadow-lg w-96 flex flex-col gap-4">
                <h2 className="text-2xl font-bold mb-2 text-center">Logga in</h2>
                {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
                <input
                    type="email"
                    placeholder="E-post"
                    className="p-3 rounded bg-gray-800 border border-gray-600 focus:outline-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Lösenord"
                    className="p-3 rounded bg-gray-800 border border-gray-600 focus:outline-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className={`bg-primary hover:bg-fuchsia-700 text-white font-semibold py-2 rounded ${
                        isSubmitting ? 'cursor-wait opacity-70' : 'cursor-pointer'
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Loging in...' : 'Log in'}
                </button>
            </form>
        </div>
    );
}