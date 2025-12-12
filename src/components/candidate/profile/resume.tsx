// import Icons from "../../ui/icons";

// export default function Resume() {
//   return (
//     <div className="space-y-4 pb-4 border-b">
//       <h2 className="text-xl font-semibold text-[#020C10]">
//         Experience and Certifications
//       </h2>
//       <div className="space-y-3">
//         <div className="flex max-lg:flex-col lg:items-center justify-between">
//           <div className="flex max-lg:flex-col gap-2 text-[#1B1B1C] text-lg font-medium">
//             <h3>Product Designer</h3> <span className="max-lg:hidden">|</span>
//             <span>Compugeen Africa, Lagos, Nigeria</span>
//           </div>
//           <span>Jan 2023 - Oct 2023</span>
//         </div>

//         <p className="text-[#1B1B1C] ">
//           Responsible for a variety of tasks and roles. Some roles and
//           responsibilities include:
//         </p>

//         <div className="flex items-center gap-2.5">
//           <Icons.link className="h-6 w-6" />
//           http://localhost:5173/candidate/profile
//         </div>
//         <ul className=" list-disc list-outside px-4 text-[#1B1B1C] lg:w-7/12">
//           <li className="list-item">
//             User Research: Conducting usability testing to gather insights into
//             user behaviors, needs, and pain points.
//           </li>
//           <li>
//             Wireframing and Prototyping: Creating low-fidelity wireframes and
//             interactive prototypes to visualize design concepts and workflows.
//           </li>
//           <li>
//             UI Design: Creation of user interface elements, including icons,
//             buttons, and navigation menus, to ensure consistency and usability
//             across digital products.
//           </li>
//           <li>
//             Information Architecture: Collaborating with Product Manager to
//             organize and structure information in a way that enhances user
//             understanding and navigation.
//           </li>
//         </ul>
//       </div>

//       <ResumeInfoCard />
//       <ResumeInfoCard />
//     </div>
//   );
// }

// export function ResumeInfoCard() {
//   return (
//     <div className="space-y-3">
//       <div className="flex max-lg:flex-col lg:items-center justify-between">
//         <div className="flex max-lg:flex-col gap-2 text-[#1B1B1C] text-lg font-medium">
//           <h3>Product Designer</h3> <span className="max-lg:hidden">|</span>
//           <span>Compugeen Africa, Lagos, Nigeria</span>
//         </div>
//         <span>Jan 2023 - Oct 2023</span>
//       </div>
//       <p className="text-[#1B1B1C] ">
//         Responsible for a variety of tasks and roles. Some roles and
//         responsibilities include:
//       </p>

//       <div className="flex items-center gap-2.5">
//         <Icons.link className="h-6 w-6" />
//         http://localhost:5173/dashboard/profile
//       </div>
//       <ul className=" list-disc list-outside px-4 text-[#1B1B1C] lg:w-7/12">
//         <li className="list-item">
//           User Research: Conducting usability testing to gather insights into
//           user behaviors, needs, and pain points.
//         </li>
//         <li>
//           Wireframing and Prototyping: Creating low-fidelity wireframes and
//           interactive prototypes to visualize design concepts and workflows.
//         </li>
//         <li>
//           UI Design: Creation of user interface elements, including icons,
//           buttons, and navigation menus, to ensure consistency and usability
//           across digital products.
//         </li>
//         <li>
//           Information Architecture: Collaborating with Product Manager to
//           organize and structure information in a way that enhances user
//           understanding and navigation.
//         </li>
//       </ul>
//     </div>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import Icons from "../../ui/icons";



interface ResumeProps {
  education: Array<{
    id: number;
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
  }>;
  experiences: Array<{
    id: number;
    company_name: string;
    job_title: string;
    description?: string;
    employment_type: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
  }>;
  certifications: Array<{
    id: number;
    name: string;
    organization: string;
    issue_date: string;
    expiration_date?: string;
  }>;
}

export default function Resume({ education, experiences, certifications }: ResumeProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      {/* Experience */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Experience and Certifications</h2>
        
        {experiences && experiences.length > 0 ? (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-blue-500 pl-4">
                <h3 className="font-semibold">{exp.job_title}</h3>
                <p className="text-gray-600">{exp.company_name}</p>
                <p className="text-sm text-gray-500">
                  {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                </p>
                {exp.description && (
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No experience added yet</p>
        )}
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Education</h3>
        {education && education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-green-500 pl-4">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.field_of_study}</p>
                <p className="text-sm text-gray-500">
                  {edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No education added yet</p>
        )}
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Certifications</h3>
        {certifications && certifications.length > 0 ? (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border-l-2 border-purple-500 pl-4">
                <h4 className="font-semibold">{cert.name}</h4>
                <p className="text-gray-600">{cert.organization}</p>
                <p className="text-sm text-gray-500">
                  Issued: {cert.issue_date}
                  {cert.expiration_date && ` - Expires: ${cert.expiration_date}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No certifications added yet</p>
        )}
      </div>
    </div>
  );
}