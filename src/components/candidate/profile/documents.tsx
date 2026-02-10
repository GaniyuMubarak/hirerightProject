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