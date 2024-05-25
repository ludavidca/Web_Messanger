'use client';

import React, {useState} from 'react';
import axios from 'axios';
import { db } from '~/server/db';
import { messages } from '~/server/db/schema';

export default function Chatbox() {
        const [inputValue, setInputValue] = useState("");

        const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
        }

        const handleSubmit = async (inputValue:string) => {
            console.log(inputValue);
            await db.insert(messages)
                .values({ content: inputValue, sentId: "1", userId:"2" })
        };
        return (
        <div className="flex flex-row bottom-0 p-6 absolute text-l border border-black rounded-2xl w-[100%]">
            <form className="flex text-ellipsis w-full">
                <input
                    type="String"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="inline-block w-full"
                    />
                    <div className="flex border border-black rounded-xl bg-slate-500"  onClick={()=>handleSubmit(inputValue)} > Send </div>
            </form>
        </div>
    );
};


