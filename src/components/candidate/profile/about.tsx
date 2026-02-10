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