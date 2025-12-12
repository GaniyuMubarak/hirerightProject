// import File from "../../shared/file";
// import Icons from "../../ui/icons";

// export default function ProfileDocuments() {
//   return (
//     <div className="space-y-5 border-b pb-5">
//       <h2 className="text-xl font-semibold text-[#020C10]">Documents</h2>
//       <div className="flex max-lg:flex-col gap-5">
//         <File icon={<Icons.pdf />} title="Joe’s Resume.pdf" size="200 KB" />
//         <File icon={<Icons.docx />} title="Cover Letter.doc" size="200 KB" />
//       </div>
//     </div>
//   );
// }





// interface Document {
//   id: string;
//   title: string;
//   size: string;
//   type: "pdf" | "docx" | "txt" | "other";
//   url?: string;
// }

// export default function ProfileDocuments() {
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/profile/documents");

//       if (!response.ok) throw new Error("Failed to fetch documents");

//       const data = await response.json();
//       setDocuments(data.documents || []);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const allowedTypes = [
//       "application/pdf",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];
//     if (!allowedTypes.includes(file.type)) {
//       alert("Only PDF and DOCX files are allowed");
//       return;
//     }

//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await fetch("/api/profile/documents/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Upload failed");

//       const newDoc = await response.json();
//       setDocuments((prev) => [...prev, newDoc]);
//       alert("Document uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Failed to upload document");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const getFileIcon = (type: string) => {
//     switch (type) {
//       case "pdf":
//         return <Icons.pdf />;
//       case "docx":
//       case "doc":
//         return <Icons.docx />;
//       default:
//         return <Icons.file />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="space-y-5 border-b pb-5">
//         <h2 className="text-xl font-semibold text-[#020C10]">Documents</h2>
//         <div className="flex max-lg:flex-col gap-5">
//           <div className="animate-pulse bg-gray-200 rounded-lg h-20 w-full"></div>
//           <div className="animate-pulse bg-gray-200 rounded-lg h-20 w-full"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5 border-b pb-5">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-[#020C10]">Documents</h2>
//         <label className="cursor-pointer">
//           <input
//             type="file"
//             className="hidden"
//             onChange={handleFileUpload}
//             accept=".pdf,.doc,.docx"
//             disabled={uploading}
//           />
//           <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
//             {uploading ? "Uploading..." : "+ Add Document"}
//           </span>
//         </label>
//       </div>

//       {documents.length === 0 ? (
//         <div className="text-center py-8 border border-dashed rounded-lg">
//           <p className="text-gray-500">No documents uploaded yet</p>
//           <label className="mt-2 inline-block text-blue-600 hover:text-blue-800 cursor-pointer">
//             <input
//               type="file"
//               className="hidden"
//               onChange={handleFileUpload}
//               accept=".pdf,.doc,.docx"
//             />
//             Upload your first document
//           </label>
//         </div>
//       ) : (
//         <div className="flex max-lg:flex-col gap-5">
//           {documents.map((doc) => (
//             <File
//               key={doc.id}
//               icon={getFileIcon(doc.type)}
//               title={doc.title}
//               size={doc.size}
//               url={doc.url}
//               onDelete={() => {
//                 // Add delete functionality if needed
//                 if (confirm("Delete this document?")) {
//                   // Call delete API
//                 }
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import File from "../../shared/file";
// import Icons from "../../ui/icons";

// interface ProfileDocumentsProps {
//   user: {
//     profile_image_url?: string;
//     resume_url?: string;
//     cover_letter_file_url?: string;
//     portfolio_url?: string;
//   };
// }

// interface DocumentItem {
//   title: string;
//   url?: string;
//   type: "pdf" | "docx" | "other";
// }

// export default function ProfileDocuments({ user }: ProfileDocumentsProps) {
//   // Build documents array from user data
//   const documents: DocumentItem[] = [];
  
//   if (user?.resume_url) {
//     documents.push({
//       title: "Resume",
//       url: user.resume_url,
//       type: "pdf",
//     });
//   }
  
//   if (user?.cover_letter_file_url) {
//     documents.push({
//       title: "Cover Letter",
//       url: user.cover_letter_file_url,
//       type: "docx",
//     });
//   }
  
//   if (user?.portfolio_url) {
//     documents.push({
//       title: "Portfolio",
//       url: user.portfolio_url,
//       type: "pdf",
//     });
//   }

//   const getFileIcon = (type: string) => {
//     switch (type) {
//       case "pdf":
//         return <Icons.pdf />;
//       case "docx":
//       case "doc":
//         return <Icons.docx />;
//       default:
//         return <Icons.file />;
//     }
//   };

//   return (
//     <div className="space-y-5 border-b pb-5">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-[#020C10]">Documents</h2>
//       </div>

//       {documents.length === 0 ? (
//         <div className="text-center py-8 border border-dashed rounded-lg">
//           <p className="text-gray-500">No documents uploaded yet</p>
//         </div>
//       ) : (
//         <div className="flex max-lg:flex-col gap-5">
//           {documents.map((doc, index) => (
//             <File
//               key={index}
//               icon={getFileIcon(doc.type)}
//               title={doc.title}
//               size={"View document"} // You can calculate size if available
//               url={doc.url}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Keep your existing File component
// function File({
//   icon,
//   title,
//   size,
//   url,
// }: {
//   icon: React.ReactElement;
//   title: string;
//   size: string;
//   url?: string;
// }) {
//   return (
//     <div className="flex gap-4 border rounded-[6px] p-4 w-full">
//       {icon}
//       <div className="flex flex-col gap-1.5 flex-1">
//         <span className="text-sm font-medium tracking-[-0.01em]">
//           {title}
//         </span>
//         <span className="text-xs tracking-[-0.01em] text-[#475467]">
//           {size}
//         </span>
//       </div>
//       {url && (
        
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//         >
//           View
//         </a>
//       )}
//     </div>
//   );
// }
"use client";
interface ProfileDocumentsProps {
  user: {
    profile_image_url?: string;
    resume_url?: string;
    cover_letter_file_url?: string;
    portfolio_url?: string;
  };
}

export default function ProfileDocuments({ user }: ProfileDocumentsProps) {
  const hasDocuments = user?.resume_url || user?.cover_letter_file_url || user?.portfolio_url;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Documents</h2>
      
      {hasDocuments ? (
        <div className="space-y-3">
          {user.resume_url && (
            <div className="flex items-center justify-between p-3 border rounded">
              <span>Resume</span>
              <a 
                href={user.resume_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            </div>
          )}
          
          {user.cover_letter_file_url && (
            <div className="flex items-center justify-between p-3 border rounded">
              <span>Cover Letter</span>
              <a 
                href={user.cover_letter_file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            </div>
          )}
          
          {user.portfolio_url && (
            <div className="flex items-center justify-between p-3 border rounded">
              <span>Portfolio</span>
              <a 
                href={user.portfolio_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No documents uploaded yet</p>
      )}
    </div>
  );
}