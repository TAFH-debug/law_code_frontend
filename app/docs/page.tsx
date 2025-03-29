"use client";
import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { FileText, ImageIcon, VideoIcon } from "lucide-react";
import {Pagination} from "@heroui/pagination";
import { motion } from "framer-motion";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";


interface FileItem {
  id: number;
  name: string;
  description: string;
  type: "pdf" | "image" | "video";
  url: string;
}

export default function ArchivePage() {
  const [data, setData] = useState<{ resources: FileItem[], total_pages: number }>({
    resources: [],
    total_pages: 1,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    axiosInstance.get(`/resources/?page=${page}`).then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.error(err);
    })
  }, [page]);

  return (
    <div className="w-full p-6 h-full">
      <div className="max-w-3xl mx-auto h-full">
        <h1 className="text-3xl font-bold text-center mb-6">Архив</h1>
        {(
          <>
          <div className="min-h-[50vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.resources.map((file) => (
                <Card key={file.id} as={Link} href={"/docs/" + file.id} className="p-4 rounded-xl shadow-lg">
                  <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-40 rounded-lg">
                  {file.type === "image" ? (
                    <ImageIcon className="w-20 h-20 text-gray-400" />
                  ) : file.type === "video" ? (
                    <VideoIcon className="w-20 h-20 text-gray-400" />
                  ) : (
                    <FileText className="w-20 h-20 text-gray-400" />
                  )}
                  <p className="mt-2 text-center text-md">{file.name}</p>
                  </motion.div>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination isCompact showControls initialPage={1} total={data.total_pages} page={page} onChange={setPage}/>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
