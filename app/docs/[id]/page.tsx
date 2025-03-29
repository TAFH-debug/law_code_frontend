"use client";
import { axiosInstance } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { id } = useParams();
    const router = useRouter();

    const [file, setFile] = useState({
      name: "",
      size: "",
      type: "PDF",
      created_at: "20/20/20",
      description: "",
      url: ""
    });

    useEffect(() => {
      axiosInstance.get("/resources/" + id).then((res) => {
        res.data.created_at = new Date(res.data.created_at).toLocaleString();
        res.data.url = "http://localhost:8000/static" + res.data.url;
        setFile(res.data);
      }).catch((err) => {
        console.error(err);
      });
    }, []);

    if (file.url === '') return <></>;

    return (
      <div className="flex flex-col items-center justify-between p-6 border rounded-3xl">
        <h1 className="text-2xl font-bold text-center">Информация о файле</h1>
        
        <div className="p-6 rounded-2xl shadow-lg w-full flex flex-col justify-start">
          <div className="mt-4 space-y-2 text-left">
            <p><strong>Имя:</strong> {file.name}</p>
            <p><strong>Размер:</strong> {file.size}</p>
            <p><strong>Тип:</strong> {file.type.toUpperCase()}</p>
            <p><strong>Загружен в:</strong> {file.created_at}</p>
            <p><strong>Описание:</strong></p>
            <p>{file.description}</p>
          </div>
        </div>

        <a
          className="mt-auto px-4 py-2 text-white rounded-lg transition border active:scale-95 focus:ring-2 focus:ring-blue-300"
          href={file.url} download={file.url.split("/").pop()?.split(".")[0]}>
        Download
        </a>

        <div className="w-full min-h-screen m-2">
          {
            file.type === "image" ? (
              <img src={file.url} alt={file.name} className="w-full h-auto rounded-lg" />
            ) : file.type === "video" ? (
              <video controls className="w-full h-auto rounded-lg">
                <source src={file.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe src={file.url} className="w-full min-h-screen rounded-lg" title={file.name}></iframe>
            )
          }
        </div>
      </div>
    );
}
