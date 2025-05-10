'use client'
import React, { useState } from "react";

export const ContactForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

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
        try{
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email, name, message})
            })

            const data = await response.json();
            if (response.ok) {
                console.log('Email sent successfully.', data);
            }
            else {
                console.error('Error when sending email.', data.error)
            }
        } catch(error){
            console.error('something went wrong.', error);
        }
    }
    


    return(
        <form onSubmit={handleSubmit}>
            <div>
                <input type="email" id="email" onChange={handleEmailChange}/>
            </div>
            <div>
                <input type="text" id="name" onChange={handleNameChange} />
            </div>
            <div>
                <textarea id="message" onChange={handleMessageChange}/>
            </div>
            <button type="submit">Send</button>
        </form>
    )
}