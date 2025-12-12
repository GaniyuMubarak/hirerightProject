// // import { cn } from "@/lib/utils";
// // import Icons from "../../ui/icons";

// // export default function ContactInfo() {
// //   return (
// //     <div className="space-y-5 border-b pb-5">
// //       <h2 className="text-xl font-semibold text-[#020C10]">
// //         Contact Information
// //       </h2>
// //       <div className="grid lg:grid-cols-3 gap-3">
// //         <ContactCard
// //           icon={<Icons.phone />}
// //           title={"Phone"}
// //           desc={"+23489094944400"}
// //           title2={"Secondary phone"}
// //           desc2={"+23489094944400"}
// //         />
// //         <ContactCard
// //           icon={<Icons.mail2 />}
// //           title={"Email"}
// //           desc={"Olivarhye@gmail.com"}
// //         />
// //         <ContactCard
// //           icon={<Icons.locationOutlined className="min-w-8 min-h-8" />} //TODO: Fix stroke width
// //           title={"Location"}
// //           desc={"Lagos, Nogeria"}
// //         />
// //         <div className="lg:col-span-3">
// //           <ContactCard
// //             icon={<Icons.link />}
// //             title={"Website"}
// //             desc={"http://localhost:5173/candidate/profile"}
// //             className="col-span-3"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export function ContactCard({
// //   icon,
// //   title,
// //   desc,
// //   title2,
// //   desc2,
// //   className,
// // }: {
// //   icon: React.ReactElement;
// //   title: string;
// //   desc: string;
// //   title2?: string;
// //   desc2?: string;
// //   className?: string;
// // }) {
// //   return (
// //     <div>
// //       <div
// //         className={cn("flex gap-4 border rounded-[6px] p-4 w-full", className)}
// //       >
// //         {icon}

// //         <div className="flex flex-col gap-1.5 ">
// //           <span className="text-xs font-medium  tracking-[-0.01em] ">
// //             {title}
// //           </span>
// //           <span className="text-sm tracking-[-0.01em] whitespace-nowrap text-[#475467]">
// //             {desc}
// //           </span>

// //           {title2 && (
// //             <span className="text-xs font-medium  tracking-[-0.01em] ">
// //               {title2}
// //             </span>
// //           )}

// //           {desc2 && (
// //             <span className="text-sm tracking-[-0.01em] whitespace-nowrap text-[#475467]">
// //               {desc2}
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// "use client";

// import { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
// import Icons from "../../ui/icons";

// interface ContactInfo {
//   phone: string;
//   secondaryPhone?: string;
//   email: string;
//   location: string;
//   website: string;
// }

// export default function ContactInfo() {
//   const [contactInfo, setContactInfo] = useState<ContactInfo>({
//     phone: "",
//     email: "",
//     location: "",
//     website: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState<string | null>(null);
//   const [tempValue, setTempValue] = useState("");

//   useEffect(() => {
//     fetchContactInfo();
//   }, []);

//   const fetchContactInfo = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/profile/contact-info");

//       if (!response.ok) throw new Error("Failed to fetch");

//       const data = await response.json();
//       setContactInfo(data);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (field: keyof ContactInfo) => {
//     setEditing(field);
//     setTempValue(contactInfo[field] || "");
//   };

//   const handleSave = async (field: keyof ContactInfo) => {
//     try {
//       const response = await fetch("/profile/contact-info", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ [field]: tempValue }),
//       });

//       if (!response.ok) throw new Error("Save failed");

//       setContactInfo((prev) => ({ ...prev, [field]: tempValue }));
//       setEditing(null);
//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save changes");
//     }
//   };

//   const handleCancel = () => {
//     setEditing(null);
//   };

//   const getIcon = (field: string) => {
//     switch (field) {
//       case "phone":
//         return <Icons.phone />;
//       case "email":
//         return <Icons.mail2 />;
//       case "location":
//         return <Icons.locationOutlined className="min-w-8 min-h-8" />;
//       case "website":
//         return <Icons.link />;
//       default:
//         return <Icons.phone />;
//     }
//   };

//   const getTitle = (field: string) => {
//     switch (field) {
//       case "phone":
//         return "Phone";
//       case "email":
//         return "Email";
//       case "location":
//         return "Location";
//       case "website":
//         return "Website";
//       default:
//         return field;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="space-y-5 border-b pb-5">
//         <h2 className="text-xl font-semibold text-[#020C10]">
//           Contact Information
//         </h2>
//         <div className="grid lg:grid-cols-3 gap-3">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="flex gap-4 border rounded-[6px] p-4 w-full">
//                 <div className="w-8 h-8 bg-gray-200 rounded"></div>
//                 <div className="flex flex-col gap-1.5 w-full">
//                   <div className="h-3 bg-gray-200 rounded w-16"></div>
//                   <div className="h-4 bg-gray-200 rounded w-32"></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5 border-b pb-5">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-[#020C10]">
//           Contact Information
//         </h2>
//         <button
//           onClick={() => {
//             /* Open edit modal or toggle edit mode */
//           }}
//           className="text-sm text-blue-600 hover:text-blue-800">
//           Edit
//         </button>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-3">
//         {/* Phone */}
//         <div className="relative group">
//           <ContactCard
//             icon={<Icons.phone />}
//             title="Phone"
//             desc={contactInfo.phone || "Not provided"}
//             title2={contactInfo.secondaryPhone ? "Secondary phone" : undefined}
//             desc2={contactInfo.secondaryPhone}
//           />
//           <button
//             onClick={() => handleEdit("phone")}
//             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
//             <Icons.edit className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Email */}
//         <div className="relative group">
//           <ContactCard
//             icon={<Icons.mail2 />}
//             title="Email"
//             desc={contactInfo.email || "Not provided"}
//           />
//           <button
//             onClick={() => handleEdit("email")}
//             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
//             <Icons.edit className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Location */}
//         <div className="relative group">
//           <ContactCard
//             icon={<Icons.locationOutlined className="min-w-8 min-h-8" />}
//             title="Location"
//             desc={contactInfo.location || "Not provided"}
//           />
//           <button
//             onClick={() => handleEdit("location")}
//             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
//             <Icons.edit className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Website */}
//         <div className="lg:col-span-3 relative group">
//           <ContactCard
//             icon={<Icons.link />}
//             title="Website"
//             desc={contactInfo.website || "Not provided"}
//             className="col-span-3"
//           />
//           <button
//             onClick={() => handleEdit("website")}
//             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
//             <Icons.edit className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {editing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96">
//             <h3 className="text-lg font-semibold mb-4">
//               Edit {getTitle(editing)}
//             </h3>
//             <input
//               type="text"
//               value={tempValue}
//               onChange={(e) => setTempValue(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2 mb-4"
//               placeholder={`Enter ${getTitle(editing).toLowerCase()}`}
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 border rounded-lg hover:bg-gray-50">
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleSave(editing as keyof ContactInfo)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Keep the ContactCard component unchanged
// export function ContactCard({
//   icon,
//   title,
//   desc,
//   title2,
//   desc2,
//   className,
// }: {
//   icon: React.ReactElement;
//   title: string;
//   desc: string;
//   title2?: string;
//   desc2?: string;
//   className?: string;
// }) {
//   return (
//     <div>
//       <div
//         className={cn("flex gap-4 border rounded-[6px] p-4 w-full", className)}>
//         {icon}

//         <div className="flex flex-col gap-1.5">
//           <span className="text-xs font-medium tracking-[-0.01em]">
//             {title}
//           </span>
//           <span className="text-sm tracking-[-0.01em] text-[#475467] break-words">
//             {desc}
//           </span>

//           {title2 && (
//             <span className="text-xs font-medium tracking-[-0.01em] mt-2">
//               {title2}
//             </span>
//           )}

//           {desc2 && (
//             <span className="text-sm tracking-[-0.01em] text-[#475467] break-words">
//               {desc2}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { cn } from "@/lib/utils";
import Icons from "../../ui/icons";

interface ContactInfoProps {
  user: {
    email?: string;
    phone?: string;
    secondaryPhone?: string;
    address?: string;
    location?: string;
    website?: string;
  };
}

export default function ContactInfo({ user }: ContactInfoProps) {
  return (
    <div className="space-y-5 border-b pb-5">
      <h2 className="text-xl font-semibold text-[#020C10]">
        Contact Information
      </h2>
      <div className="grid lg:grid-cols-3 gap-3">
        <ContactCard
          icon={<Icons.phone />}
          title={"Phone"}
          desc={user?.phone || "Not provided"}
          title2={user?.secondaryPhone ? "Secondary phone" : undefined}
          desc2={user?.secondaryPhone}
        />
        <ContactCard
          icon={<Icons.mail2 />}
          title={"Email"}
          desc={user?.email || "Not provided"}
        />
        <ContactCard
          icon={<Icons.locationOutlined className="min-w-8 min-h-8" />}
          title={"Location"}
          desc={user?.location || user?.address || "Not provided"}
        />
        <div className="lg:col-span-3">
          <ContactCard
            icon={<Icons.link />}
            title={"Website"}
            desc={user?.website || "Not provided"}
            className="col-span-3"
          />
        </div>
      </div>
    </div>
  );
}

export function ContactCard({
  icon,
  title,
  desc,
  title2,
  desc2,
  className,
}: {
  icon: React.ReactElement;
  title: string;
  desc: string;
  title2?: string;
  desc2?: string;
  className?: string;
}) {
  return (
    <div>
      <div
        className={cn("flex gap-4 border rounded-[6px] p-4 w-full", className)}>
        {icon}

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium tracking-[-0.01em]">
            {title}
          </span>
          <span className="text-sm tracking-[-0.01em] text-[#475467] break-words">
            {desc}
          </span>

          {title2 && (
            <span className="text-xs font-medium tracking-[-0.01em] mt-2">
              {title2}
            </span>
          )}

          {desc2 && (
            <span className="text-sm tracking-[-0.01em] text-[#475467] break-words">
              {desc2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}