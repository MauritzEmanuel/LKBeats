'use client'
import React, { useState } from "react";

export const ContactForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const [formMessage, setFormMessage] = useState(<p></p>);
    const [emailError, setEmailError] = useState(<p></p>);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !name || !message) {
            setFormMessage(<p className="text-red-800 font-semibold">All fields are required.</p>);
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError(<p className="text-red-500">Please enter a valid email address.</p>);
            return;
        }

        try{
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email, name, message})
            })

            const data = await response.json();

            if (response.ok) {
                setFormMessage(<p className="text-green-500">Request sent.</p>);
                setIsDisabled(true);
            } else {
                setFormMessage(<p className="text-red-500">Error: {data.error || 'Could not send email.'}</p>);
            }
        } catch(error){
            console.error('something went wrong.', error);
            setFormMessage(<p className="text-red-500">Something went wrong.</p>);
        }
    }
    


    return(
        <form 
        onSubmit={handleSubmit} 
        className="text-white bg-[#B20050] flex flex-col w-200 py-4 my-10 items-center rounded-2xl outline-2 outline-secondary">
            <h1 className="text-3xl mb-2 font-jacq font-medium">Beat Request</h1>
            <p className="font-semibold">Come in contact with Ludde K!</p>
            <p className="text-center w-[70%] my-2">The request should contain an information of how you would like your beat. Give examples of inspiration, genre, tempo, vibe etc.</p>
            <p>The more information - The better the outcome.</p>
            <div className="flex justify-between w-[70%] mt-3">
                <div className="w-[40%]">
                    <label htmlFor="email" className="mr-2">Email</label>
                    <input placeholder="example@domain.com" type="email" id="email" onChange={handleEmailChange} className="bg-white text-black rounded w-full"/>
                    {emailError && emailError}
                </div>
                <div className="w-[40%]">
                    <label htmlFor="name" className="mr-2">Name</label>
                    <input type="text" id="name" onChange={handleNameChange} className="bg-white text-black rounded w-full"/>
                </div>
            </div>
            <div className="flex flex-col w-[70%] my-3">
                <label htmlFor="message">Message</label>
                <textarea id="message" onChange={handleMessageChange} className="bg-white text-black rounded h-40"/>
            </div>
            <button disabled={isDisabled} type="submit" className="w-20 rounded bg-green-500 cursor-pointer hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50">Send</button>
            {formMessage && formMessage}
        </form>
    )
}