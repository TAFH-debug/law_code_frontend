export default function Page() {
    const file = {
      name: "aboba.pdf",
      size: "2.3 MB",
      type: "PDF",
      uploadedAt: "20/20/20",
      description: "aboba"
    };
  
    return (
      <div className="flex flex-col items-center justify-between p-6 border rounded-3xl h-96">
        <h1 className="text-2xl font-bold text-center">File Information</h1>
        
        <div className="p-6 rounded-2xl shadow-lg w-full flex flex-col justify-start">
          <div className="mt-4 space-y-2 text-left">
            <p><strong>Name:</strong> {file.name}</p>
            <p><strong>Size:</strong> {file.size}</p>
            <p><strong>Type:</strong> {file.type}</p>
            <p><strong>Uploaded At:</strong> {file.uploadedAt}</p>
            <p><strong>Description:</strong> {file.description}</p>
          </div>
        </div>
  
        <button className="mt-auto px-4 py-2 text-white rounded-lg transition border active:scale-95 focus:ring-2 focus:ring-blue-300">
          Download
        </button>
      </div>
    );
}
