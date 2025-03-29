"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { motion } from "framer-motion";

interface Message {
  sender: string;
  chunks: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    ws.current = new WebSocket("ws://localhost:8000/negotiations/ws");

    ws.current.onmessage = ((m: any) => {
      const e: { idx: number, chunk: string } = JSON.parse(m.data);
      setTimeout(() => {
        setMessages((prev) => {
          if (prev[prev.length - 1].chunks.length <= e.idx) {
            prev[prev.length - 1].chunks.push(e.chunk);
          }
          return [...prev];
        });
      }, (e.idx + 1) * 100);
    })
  }, []);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { chunks: [input], sender: "user" }, { chunks: [], sender: "bot" }]);
    ws.current!.send(input);
    setInput("");
  }, [input]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Card className="m-auto relative w-full flex flex-col h-[500px] shadow-2xl rounded-xl overflow-hidden bg-black/60 border border-gray-700 backdrop-blur-md">
      <div ref={chatContainerRef} className="flex-1 p-4 space-y-3 overflow-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-3 rounded-lg max-w-[75%] text-sm ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto shadow-md"
                : "bg-gray-700 text-gray-200 mr-auto shadow-md"
            }`}
          >
            {
              msg.chunks.length == 0 ? "..." : msg.chunks.map((chunk, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {chunk}
                </motion.span>
              ))
            }
          </motion.div>
        ))}
      </div>

      <div className="p-3 bg-gray-800 flex items-center gap-3 border-t border-gray-700">
        <Input
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onPress={sendMessage} color="primary">
          =&gt;
        </Button>
      </div>
    </Card>
  );
}
