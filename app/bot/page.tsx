"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { motion } from "framer-motion";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
  }, [input]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="relative w-full max-w-md flex flex-col h-[500px] shadow-2xl rounded-xl overflow-hidden bg-black/60 border border-gray-700 backdrop-blur-md">
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
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="p-3 bg-gray-800 flex items-center gap-3 border-t border-gray-700">
          <Input
            ref={inputRef}
            placeholder="Введите сообщение..."
            className="flex-1 bg-gray-900 text-white border-gray-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onPress={sendMessage} className="bg-blue-500 hover:bg-blue-600">
            =>
          </Button>
        </div>
      </Card>
    </div>
  );
}
