"use client";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

interface History {
  id: number;
  name: string;
  created_at: string;
  score: number;
  messages: string;
}

export default function Page() {
    const [history, setHistory] = useState<History[]>([]);

    useEffect(() => {
      axiosInstance.get('/history/me').then((res) => {
        setHistory(res.data);
      });
    }, []);

    return (
        <div className="w-full p-6 h-full translate-y-[-50px]">
        <div className="max-w-6xl mx-auto h-full">
          <h1 className="text-3xl font-bold text-center mb-6">Выберите симуляцию чтобы разобрать:</h1>
            <>
              <div className="min-h-[50vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {history.map((sim) => (
                    <motion.div 
                      key={sim.id}
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center min-h-10 rounded-lg"
                    >
                      <Card as={Link} href={`/analysis/${sim.id}`} className="rounded-xl shadow-lg p-2">
                        <CardHeader className="select-none">
                          <p className="text-center text-md w-full select-none">{sim.name}</p>
                        </CardHeader>
                        <Divider className="select-none"/> 
                        <CardBody className="flex flex-row w-full space-x-4 items-center justify-center">
                          <p>{new Date(sim.created_at).toLocaleString()}</p>
                          <div className="flex flex-row space-x-4 items-center justify-center">
                            <Divider orientation="vertical" className="h-7 select-none"></Divider>
                            <AnimatedCircularProgressBar
                              max={100}
                              min={0}
                              value={100}
                              gaugePrimaryColor={sim.id % 2 === 0 ? "#e22323" : "#438de1"}
                              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
        </div>
      </div>
    )
}