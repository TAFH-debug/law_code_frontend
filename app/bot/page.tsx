"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="relative w-full max-w-md flex flex-col h-[500px] shadow-2xl rounded-xl overflow-hidden bg-black/60 border border-gray-700 backdrop-blur-md">
        <ScrollArea className="flex-1 p-4 space-y-3">
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
        </ScrollArea>

        <div className="p-3 bg-gray-800 flex items-center gap-3 border-t border-gray-700">
          <Input
            placeholder="Введите сообщение..."
            className="flex-1 bg-gray-900 text-white border-gray-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600">
            =>
          </Button>
        </div>
      </Card>
    </div>
  );
}
