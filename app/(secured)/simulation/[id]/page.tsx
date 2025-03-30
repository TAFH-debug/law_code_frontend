"use client"
import { AnimatedCircularProgressBarLarge } from "@/components/magicui/animated-circular-progress-bar-large";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { addToast } from "@heroui/toast";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    const { id } = useParams();
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [actions, setActions] = useState<Action[]>([]);
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => {
        if (ws.current === null) {
            ws.current = new WebSocket("ws://localhost:8000/simulations/ws?id=" + id);

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.end) {
                    ws.current?.close();
                    setScore(data.score);
                    addToast({ description: "Симуляция закончена." });
                    return;
                }
                data.messages.forEach((message: any) => message.sender = "bot");
                setMessages((prevMessages) => [...prevMessages, ...data.messages]);
                setActions(data.actions);
            }
        }
    }, []);

    useEffect(() => {
        if (score === null) return;
        const messages_s = JSON.stringify(messages);

        axiosInstance.post("/history", {
            name: "Simulation " + id,
            score: score,
            messages: messages_s
        }).then((res) => {
            axiosInstance.put("/users/me?score=" + score + "&history=" + res.data.id).then((res) => {
                addToast({ description: "Score updated", color: "success" });
            });
        })
    }, [score]);

    if (score !== null) {
        return <div className="flex flex-col justify-center items-center h-full">
            <Card className="flex flex-col items-center">
                <h1 className="font-bold text-lg m-5">Ты получил {score} очков за эту миссию.</h1>
                <AnimatedCircularProgressBarLarge 
                    className="m-5"
                    max={100} 
                    value={score} 
                    min={0} 
                    gaugePrimaryColor="#438de1"
                    gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                >
                </AnimatedCircularProgressBarLarge>
                <Button className="m-5" color="primary" as={Link} href="/simulation">
                    Продолжить
                </Button>
            </Card>
        </div>
    }

    return (
        <>
        <div className="w-full flex flex-col h-full rounded-lg bg-accent">
            <div className="w-full flex flex-col max-h-full overflow-scroll">
            {
                messages.map((message, index) => {
                    if (message.type === "action") return (
                        <div key={index} className="mx-auto p-3">
                            <TextAnimate>
                            {message.content}
                            </TextAnimate>                        
                        </div>
                    )

                    if (message.sender === "bot") return (
                        <div key={index} className="m-4 p-3 rounded-lg max-w-[75%] text-sm bg-blue-500">
                            <TypingAnimation duration={50} className="text-sm">
                            {message.content}
                            </TypingAnimation>
                        </div>
                    )

                    return (
                        <div key={index} className="m-4 p-3 rounded-lg max-w-[75%] text-sm bg-blue-500">
                            <TextAnimate className="ml-auto">
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