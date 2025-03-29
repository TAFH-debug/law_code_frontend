"use client"
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react"


interface Message {
    type: string;
    content: string;
    sender: string;
}

interface Action {
    description: string;
    id: number;
}

function TextAnimate({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={className}
        >
            {children}
        </motion.div>
    )

}

export default function Page() {
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [actions, setActions] = useState<Action[]>([]);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/simulations/ws?id=1");

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.end) {
                ws.current?.close();
                addToast({ description: "Simulation ended",  });
                return;
            }
            data.messages.forEach((message: any) => message.sender = "bot");
            setMessages((prevMessages) => [...prevMessages, ...data.messages]);
            setActions(data.actions);
        }
    }, []);

    return (
        <>
        <div className="w-full flex flex-col h-full rounded-lg bg-accent">
            <div className="w-full flex flex-col max-h-full overflow-scroll">
            {
                messages.map((message, index) => {
                    if (message.type === "action") return (
                        <div className="mx-auto p-3 ">
                            <TextAnimate key={index}>
                            {message.content}
                            </TextAnimate>                        
                        </div>
                    )

                    if (message.sender === "bot") return (
                        <div className="m-4 p-3 rounded-lg max-w-[75%] text-sm bg-blue-500">
                            <TypingAnimation key={index} className="text-sm">
                            {message.content}
                            </TypingAnimation>
                        </div>
                    )

                    return (
                        <div className="m-4 p-3 rounded-lg max-w-[75%] text-sm bg-blue-500">
                            <TextAnimate key={index} className="ml-auto">
                            {message.content}
                            </TextAnimate>
                        </div>
                    )
                })
            }
            </div>
            <div className="flex justify-center">
                {
                    actions.map((action, index) => {
                        return (
                            <Button key={index} className="m-2 text-wrap" onPress={() => ws.current?.send(JSON.stringify({ id: action.id }))}>
                                {action.description}
                            </Button>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}