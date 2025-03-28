"use client";
import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { FileText } from "lucide-react";
import {Pagination} from "@heroui/pagination";


interface FileItem {
  id: number;
  name: string;
  type: "pdf" | "image" | "video";
  url: string;
}

export default function ArchivePage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  {/*/useEffect(() => {
    async function fetchFiles() {
      try {
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);*/}
  useEffect(() => {
    const placeholders: FileItem[] = [
      { id: 1, name: "Документ 1.pdf", type: "pdf", url: "/placeholders/sample.pdf" },
      { id: 2, name: "Документ 2.pdf", type: "pdf", url: "/placeholders/sample.pdf" },
      { id: 3, name: "Фото 1.jpg", type: "image", url: "https://via.placeholder.com/300" },
      { id: 4, name: "Фото 2.jpg", type: "image", url: "https://via.placeholder.com/300" },
      { id: 5, name: "Видео 1.mp4", type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
      { id: 6, name: "Видео 2.mp4", type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" },
    ];
    setFiles(placeholders);
  }, []);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Архив</h1>

        {loading ? (
          <p className="text-center">Загрузка файлов...</p>
        ) : (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <Card key={file.id} className="p-4 rounded-xl shadow-lg">
                {file.type === "image" ? (
                  <img src={file.url} alt={file.name} className="w-full h-40 object-cover rounded-lg" />
                ) : file.type === "video" ? (
                  <video src={file.url} controls className="w-full h-40 rounded-lg"></video>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 rounded-lg">
                    <FileText className="w-12 h-12 text-gray-400" />
                    <span className="mt-2 text-sm">{file.name}</span>
                  </div>
                )}
                <p className="mt-2 text-center text-sm">{file.name}</p>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination isCompact showControls initialPage={1} total={10} />
          </div>
          </>
          
        )}
      </div>
    </div>
  );
}
