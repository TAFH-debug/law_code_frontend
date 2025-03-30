"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Pagination } from "@heroui/pagination";
import { motion } from "framer-motion";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { Link } from "@heroui/link";
import { axiosInstance } from "@/lib/axios";

interface Simulation {
  id: number;
  name: string;
  description: string;
}

export default function Page() {
  const [sims, setSims] = useState<{ simulations: Simulation[], total_pages: number }>({
    simulations: [],
    total_pages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    axiosInstance.get(`/simulations/?page=${page}`).then((res) => {
      setSims(res.data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, [page]);

  return (
    <div className="w-full p-6 h-full translate-y-[-50px]">
      <div className="max-w-6xl mx-auto h-full">
        <h1 className="text-3xl font-bold text-center mb-6">Симуляции</h1>

        {loading ? (
          <p className="text-center">Загрузка файлов...</p>
        ) : (
          <>
            <div className="min-h-[50vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {sims.simulations.map((sim) => (
                  <motion.div 
                    key={sim.id}
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center min-h-10 rounded-lg"
                  >
                    <Card as={Link} href={`/simulation/${sim.id}`} className="rounded-xl shadow-lg p-2">
                      <CardHeader className="select-none">
                        <p className="text-center text-md w-full select-none">{sim.name}</p>
                      </CardHeader>
                      <Divider className="select-none"/> 
                      <CardBody className="flex flex-row w-full space-x-4 items-center justify-center">
                        <p className="text-sm flex-grow-1 select-none">{sim.description}</p>
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
            <div className="mt-6 flex justify-center">
              <Pagination 
                isCompact 
                showControls 
                initialPage={1} 
                total={sims.total_pages} 
                page={page} 
                onChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
