"use client";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { axiosInstance } from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface History {
    id: number;
    name: string;
    created_at: string;
    score: number;
    messages: string;
}

interface Message {
    sender: string;
    content: string;
    type: string;
}

export default function Page() {
    const { id } = useParams();

    const [history, setHistory] = useState<History | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        axiosInstance.get("/history/" + id).then((res) => {
            setHistory(res.data);
            setMessages(JSON.parse(res.data.messages));
        });
    }, []);

    if (history === null) {
        return <></>;
    }
    
    return (
        <div className="md:flex">
        <div className="m-5 w-full flex flex-col h-full rounded-lg bg-accent">
            <div className="w-full flex flex-col max-h-full overflow-scroll">
            {
                messages.map((message, index) => {
                    if (message.type === "action") return (
                        <div key={index} className="mx-auto p-3">
                            {message.content}                     
                        </div>
                    )

                    if (message.sender === "bot") return (
                        <div key={index} className="m-4 p-3 rounded-lg max-w-[75%] text-sm bg-blue-500">
                            {message.content}
                        </div>
                    )

                    return (
                        <div key={index} className="m-4 p-3 rounded-lg max-w-[75%] text-sm bg-blue-500">
                            {message.content}
                        </div>
                    )
                })
            }
            </div>
        </div>
        <div className="m-5 w-full flex flex-col h-full rounded-lg bg-accent">
            <h1 className="p-3 text-xl font-bold">Фидбэк: </h1>
        </div>
        </div>
    )
}