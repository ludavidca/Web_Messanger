'use client';

import React, {useState} from 'react';
import axios from 'axios';

export default function Chatbox() {
        const [inputValue, setInputValue] = useState("");

        const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
        }

        const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();;

        };
        return (
        <div className="flex flex-row bottom-0 p-6 absolute text-l border border-black rounded-2xl w-[100%]">
            <form onSubmit={handleSubmit} method="post" className="flex text-ellipsis w-full">
                <input
                    type="String"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="inline-block w-full"
                    
                    />
                    <button type="submit" className="flex border border-black rounded-xl bg-slate-500"> Send </button>
            </form>
        </div>
    );
};


