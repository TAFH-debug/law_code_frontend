"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Pagination } from "@heroui/pagination";
import { animate, motion } from "framer-motion";
import { axiosInstance } from "@/lib/axios";
import { CardContainer as HoverContainer, CardBody as HoverBody, CardItem as HoverItem } from "@/components/ui/3d-card";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { Link } from "@heroui/link";

interface Simulation {
  id: number;
  name: string;
  description: string;
  score: number
}

export default function VRPage() {
  const [sims, setSims] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // how many sims per page
  const pageSize = 15;

  // Dummy data for testing 
  const fakeSims: Simulation[] = [];
  for (let i = 1; i <= 100; i++) {
    fakeSims.push({
      id: i,
      name: `Simulation ${i}`,
      description: `Description for Simulation ${i}`,
      score: Math.floor(Math.random() * 100),
    });
  }
  // Calculate for fake data
  const totalPages = Math.ceil(fakeSims.length / pageSize);
  // delete above ^^

  useEffect(() => {
    setLoading(true);

    // Uncomment :
    /*
    axiosInstance.get(`/simulations/?page=${page}`).then((res) => {
      setSims(res.data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
    */

    // fake data:
    const startIndex = (page - 1) * pageSize;
    const paginatedFiles = fakeSims.slice(startIndex, startIndex + pageSize);
    setSims(paginatedFiles);
    setLoading(false);
  }, [page]);

  return (
    <div className="w-full p-6 h-full translate-y-[-50px]">
      <div className="max-w-6xl mx-auto h-full">
        <h1 className="text-3xl font-bold text-center mb-6">simulations</h1>

        {loading ? (
          <p className="text-center">Загрузка файлов...</p>
        ) : (
          <>
            <div className="min-h-[50vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {sims.map((sim) => (
                  <HoverContainer >
                    <HoverBody key={sim.id}  >
                      <HoverItem translateZ={40}>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center justify-center min-h-10 rounded-lg"
                        >
                          <Card isPressable as={Link} href={`/simulation/${sim.id}`} className="rounded-xl shadow-lg p-2">
                            <CardHeader className="">
                              <p className="text-center text-md w-full">{sim.name}</p>
                            </CardHeader>
                            <Divider className=""/> 
                            <CardBody className="flex flex-row w-full space-x-4 items-center justify-center">
                              <p className="text-sm flex-grow-1">{sim.description}</p>
                              <div className="flex flex-row space-x-4 items-center justify-center">
                                <Divider orientation="vertical" className="h-7"></Divider>
                                <AnimatedCircularProgressBar
                                  max={100}
                                  min={0}
                                  value={sim.score}
                                  gaugePrimaryColor={sim.id % 2 === 0 ? "#e22323" : "#438de1"}
                                  gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                                />
                              </div>
                            </CardBody>
                          </Card>
                        </motion.div>
                      </HoverItem>
                    </HoverBody>
                  </HoverContainer>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Pagination 
                isCompact 
                showControls 
                initialPage={1} 
                total={totalPages} 
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
