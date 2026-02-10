
// "use client";

// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { EmployerProfileData } from "@/types/profile";

// interface ProfileSectionProps {
//   section: keyof EmployerProfileData;
//   data: EmployerProfileData;
//   isEditing: boolean;
//   showPreview: boolean;
//   onUpdate: (section: keyof EmployerProfileData, data: any) => void;
// }

// export default function ProfileSection({
//   section,
//   data,
//   isEditing,
//   showPreview,
//   onUpdate,
// }: ProfileSectionProps) {
//   const sectionData = data[section];

//   const handleChange = (field: string, value: any) => {
//     onUpdate(section, { [field]: value });
//   };

//   const renderContent = () => {
//     switch (section) {
//       case "basic":
//         return renderBasicInfo();
//       case "company":
//         return renderCompanyInfo();
//       case "social":
//         return renderSocialInfo();
//       case "additional":
//         return renderAdditionalInfo();
//       default:
//         return null;
//     }
//   };

//   const renderBasicInfo = () => {
//     if (isEditing) {
//       return (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name *
//               </label>
//               <Input
//                 value={sectionData.fullName || ""}
//                 onChange={(e) => handleChange("fullName", e.target.value)}
//                 placeholder="John Doe"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Job Title *
//               </label>
//               <Input
//                 value={sectionData.jobTitle || ""}
//                 onChange={(e) => handleChange("jobTitle", e.target.value)}
//                 placeholder="HR Manager"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email *
//               </label>
//               <Input
//                 value={sectionData.email || ""}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 type="email"
//                 placeholder="john@company.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number *
//               </label>
//               <Input
//                 value={sectionData.phone || ""}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//                 placeholder="+1 (555) 123-4567"
//               />
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <p className="text-sm font-medium text-gray-500">Full Name</p>
//           <p className="mt-1 text-gray-900">
//             {sectionData.fullName || "Not provided"}
//           </p>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500">Job Title</p>
//           <p className="mt-1 text-gray-900">
//             {sectionData.jobTitle || "Not provided"}
//           </p>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500">Email</p>
//           <p className="mt-1 text-gray-900">
//             {sectionData.email || "Not provided"}
//           </p>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500">Phone Number</p>
//           <p className="mt-1 text-gray-900">
//             {sectionData.phone || "Not provided"}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   const renderCompanyInfo = () => {
//     const companySizes = [
//       "1-10 employees",
//       "11-50 employees",
//       "51-200 employees",
//       "201-500 employees",
//       "501-1000 employees",
//       "1000+ employees",
//     ];

//     const industries = [
//       "Technology",
//       "Finance",
//       "Healthcare",
//       "Education",
//       "Retail",
//       "Manufacturing",
//       "Consulting",
//       "Other",
//     ];

//     if (isEditing) {
//       return (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Company Name *
//               </label>
//               <Input
//                 value={sectionData.companyName || ""}
//                 onChange={(e) => handleChange("companyName", e.target.value)}
//                 placeholder="TechCorp Inc."
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Industry *
//               </label>
//               <Select
//                 value={sectionData.industry || ""}
//                 onValueChange={(value) => handleChange("industry", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select industry" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {industries.map((industry) => (
//                     <SelectItem key={industry} value={industry}>
//                       {industry}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Company Size *
//               </label>
//               <Select
//                 value={sectionData.companySize || ""}
//                 onValueChange={(value) => handleChange("companySize", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {companySizes.map((size) => (
//                     <SelectItem key={size} value={size}>
//                       {size}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Location *
//               </label>
//               <Input
//                 value={sectionData.location || ""}
//                 onChange={(e) => handleChange("location", e.target.value)}
//                 placeholder="San Francisco, CA"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Founded Year
//               </label>
//               <Input
//                 value={sectionData.foundedYear || ""}
//                 onChange={(e) => handleChange("foundedYear", e.target.value)}
//                 placeholder="2015"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company Description *
//             </label>
//             <Textarea
//               value={sectionData.description || ""}
//               onChange={(e) => handleChange("description", e.target.value)}
//               placeholder="Describe your company..."
//               className="min-h-[120px]"
//             />
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-sm font-medium text-gray-500">Company Name</p>
//             <p className="mt-1 text-gray-900">
//               {sectionData.companyName || "Not provided"}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Industry</p>
//             <p className="mt-1 text-gray-900">
//               {sectionData.industry || "Not provided"}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Company Size</p>
//             <p className="mt-1 text-gray-900">
//               {sectionData.companySize || "Not provided"}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Location</p>
//             <p className="mt-1 text-gray-900">
//               {sectionData.location || "Not provided"}
//             </p>
//           </div>
//           {sectionData.foundedYear && (
//             <div>
//               <p className="text-sm font-medium text-gray-500">Founded Year</p>
//               <p className="mt-1 text-gray-900">{sectionData.foundedYear}</p>
//             </div>
//           )}
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500">Description</p>
//           <p className="mt-1 text-gray-900 whitespace-pre-line">
//             {sectionData.description || "Not provided"}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   const renderSocialInfo = () => {
//     const socialPlatforms = [
//       { key: "website", label: "Website", placeholder: "https://company.com" },
//       {
//         key: "linkedin",
//         label: "LinkedIn",
//         placeholder: "https://linkedin.com/company",
//       },
//       {
//         key: "twitter",
//         label: "Twitter",
//         placeholder: "https://twitter.com/company",
//       },
//       {
//         key: "github",
//         label: "GitHub",
//         placeholder: "https://github.com/company",
//       },
//     ];

//     if (isEditing) {
//       return (
//         <div className="space-y-6">
//           {socialPlatforms.map((platform) => (
//             <div key={platform.key}>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {platform.label}
//               </label>
//               <Input
//                 value={sectionData[platform.key] || ""}
//                 onChange={(e) => handleChange(platform.key, e.target.value)}
//                 placeholder={platform.placeholder}
//               />
//             </div>
//           ))}
//         </div>
//       );
//     }

//     const hasSocialLinks = socialPlatforms.some(
//       (platform) => sectionData[platform.key]
//     );

//     if (!hasSocialLinks) {
//       return (
//         <div className="text-center py-8">
//           <p className="text-gray-500">No social links added yet.</p>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-4">
//         {socialPlatforms.map((platform) => {
//           if (!sectionData[platform.key]) return null;

//           return (
//             <div
//               key={platform.key}
//               className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//               <span className="text-xl">
//                 {platform.key === "website" && "🌐"}
//                 {platform.key === "linkedin" && "💼"}
//                 {platform.key === "twitter" && "🐦"}
//                 {platform.key === "github" && "💻"}
//               </span>
//               <div className="flex-1">
//                 <p className="font-medium">{platform.label}</p>
//                 <a
//                   href={
//                     sectionData[platform.key].startsWith("http")
//                       ? sectionData[platform.key]
//                       : `https://${sectionData[platform.key]}`
//                   }
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline text-sm">
//                   {sectionData[platform.key]}
//                 </a>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const renderAdditionalInfo = () => {
//     const hiringOptions = [
//       "Remote Work",
//       "Flexible Hours",
//       "Equity Options",
//       "Health Insurance",
//       "Learning Budget",
//       "Unlimited PTO",
//       "Career Growth",
//       "Team Events",
//       "Parental Leave",
//       "Wellness Programs",
//     ];

//     if (isEditing) {
//       return (
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Hiring Preferences
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {hiringOptions.map((option) => (
//                 <Badge
//                   key={option}
//                   variant={
//                     sectionData.hiringPreferences?.includes(option)
//                       ? "default"
//                       : "outline"
//                   }
//                   className="cursor-pointer"
//                   onClick={() => {
//                     const current = sectionData.hiringPreferences || [];
//                     const newPreferences = current.includes(option)
//                       ? current.filter((item: string) => item !== option)
//                       : [...current, option];
//                     handleChange("hiringPreferences", newPreferences);
//                   }}>
//                   {option}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Interview Process
//             </label>
//             <Textarea
//               value={sectionData.interviewProcess || ""}
//               onChange={(e) => handleChange("interviewProcess", e.target.value)}
//               placeholder="Describe your interview process..."
//               className="min-h-[100px]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Company Benefits
//             </label>
//             <Textarea
//               value={sectionData.benefits || ""}
//               onChange={(e) => handleChange("benefits", e.target.value)}
//               placeholder="List your company benefits..."
//               className="min-h-[100px]"
//             />
//           </div>
//         </div>
//       );
//     }

//     const hasAdditionalInfo =
//       sectionData.hiringPreferences?.length > 0 ||
//       sectionData.interviewProcess ||
//       sectionData.benefits;

//     if (!hasAdditionalInfo) {
//       return (
//         <div className="text-center py-8">
//           <p className="text-gray-500">No additional information added yet.</p>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6">
//         {sectionData.hiringPreferences?.length > 0 && (
//           <div>
//             <p className="text-sm font-medium text-gray-500 mb-2">
//               Hiring Preferences
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {sectionData.hiringPreferences.map(
//                 (pref: string, index: number) => (
//                   <Badge key={index} variant="secondary">
//                     {pref}
//                   </Badge>
//                 )
//               )}
//             </div>
//           </div>
//         )}

//         {sectionData.interviewProcess && (
//           <div>
//             <p className="text-sm font-medium text-gray-500 mb-2">
//               Interview Process
//             </p>
//             <p className="mt-1 text-gray-900 whitespace-pre-line">
//               {sectionData.interviewProcess}
//             </p>
//           </div>
//         )}

//         {sectionData.benefits && (
//           <div>
//             <p className="text-sm font-medium text-gray-500 mb-2">
//               Company Benefits
//             </p>
//             <p className="mt-1 text-gray-900 whitespace-pre-line">
//               {sectionData.benefits}
//             </p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderPreview = () => {
//     if (!showPreview || !isEditing) return null;

//     return (
//       <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
//         <h3 className="font-semibold text-gray-700 mb-4">Preview</h3>
//         {renderContent()}
//       </div>
//     );
//   };

//   const sectionTitles = {
//     basic: "Basic Information",
//     company: "Company Information",
//     social: "Social Links",
//     additional: "Additional Information",
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-xl">
//           {sectionTitles[section as keyof typeof sectionTitles]}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {renderPreview()}
//         <div className="space-y-6">{renderContent()}</div>
//       </CardContent>
//     </Card>
//   );
// }
