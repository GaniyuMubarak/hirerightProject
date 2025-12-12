// export default function AboutMe() {
//   return (
//     <div className="space-y-6 border-b pb-6">
//       <h2 className="text-xl font-semibold text-[#020C10]">About</h2>
//       <p className="text-[#475467]">
//         Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
//         ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
//         dis parturient montes, nascetur ridiculus mus. Donec quam felis,
//         ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
//         quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
//         arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
//         Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
//       </p>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";

// export default function AboutMe() {
//   const [aboutText, setAboutText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // useEffect(() => {
//   //   const fetchAboutMe = async () => {
//   //     try {
//   //       setLoading(true);
//   //       // Adjust the endpoint based on your API structure
//   //       // const response = await fetch("/onboarding/a");

//   //       // ✅ CORRECT - Full API URL
//   //       const response = await fetch(
//   //         "https://appealing-perception-production.up.railway.app/api/candidates/profile",
//   //         {
//   //           method: "GET",
//   //           headers: {
//   //             Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //             Accept: "application/json",
//   //           },
//   //         }
//   //       );

//   //       if (!response.ok) {
//   //         throw new Error(`Failed to fetch: ${response.status}`);
//   //       }

//   //       const data = await response.json();
//   //       setAboutText(data.about || data.description || data.bio || "");
//   //     } catch (err) {
//   //       console.error("Error fetching about me:", err);
//   //       setError("Failed to load about information");
//   //       // Fallback to default text
//   //       setAboutText(
//   //         "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."
//   //       );
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchAboutMe();
//   // }, []);

//   useEffect(() => {
//     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//     console.log("API URL:", API_BASE_URL); // ← Add this
//     const fetchAboutMe = async () => {
//       try {
//         setLoading(true);
//         // Adjust the endpoint based on your API structure
//         const response = await fetch("/candidates/profile");

//         // // ✅ CORRECT - Full API URL
//         // const response = await fetch(
//         //   "https://appealing-perception-production.up.railway.app/api/candidates/profile",
//         //   {
//         //     method: "GET",
//         //     headers: {
//         //       Authorization: `Bearer ${localStorage.getItem("token")}`,
//         //       Accept: "application/json",
//         //     },
//         //   }
//         // );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch: ${response.status}`);
//         }

//         const data = await response.json();
//         setAboutText(data.about || data.description || data.bio || "");
//       } catch (err) {
//         console.error("Error fetching about me:", err);
//         setError("Failed to load about information");
//         // Fallback to default text
//         setAboutText(
//           "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAboutMe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="space-y-6 border-b pb-6">
//         <h2 className="text-xl font-semibold text-[#020C10]">About</h2>
//         <div className="animate-pulse">
//           <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-4/6"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="space-y-6 border-b pb-6">
//         <h2 className="text-xl font-semibold text-[#020C10]">About</h2>
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 border-b pb-6">
//       <h2 className="text-xl font-semibold text-[#020C10]">About</h2>
//       <p className="text-[#475467] whitespace-pre-line">
//         {aboutText || "No about information available."}
//       </p>
//     </div>
//   );
// }



"use client";

interface AboutMeProps {
  user: {
    bio?: string;
    title?: string;
    about?: string;
    description?: string;
  };
}

export default function AboutMe({ user }: AboutMeProps) {
  // Get the about text from various possible fields
  const aboutText = user?.bio || user?.about || user?.description || "";

  return (
    <div className="space-y-6 border-b pb-6">
      <h2 className="text-xl font-semibold text-[#020C10]">About</h2>
      
      {user?.title && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Title</p>
          <p className="font-medium">{user.title}</p>
        </div>
      )}
      
      {aboutText ? (
        <p className="text-[#475467] whitespace-pre-line">{aboutText}</p>
      ) : (
        <p className="text-gray-500">No about information available.</p>
      )}
    </div>
  );
}