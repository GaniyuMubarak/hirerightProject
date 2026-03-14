// import { Button } from "../../ui/button";
// import Icons from "../../ui/icons";

// export default function SocialLinks() {
//   return (
//     <div className="flex flex-col gap-4 border-b pb-4 rounded-[6px] w-full">
//       <h2 className="font-medium text-[#1B1B1C]">Social Media</h2>
//       <div className="flex gap-2.5">
//         <Button variant={"secondary"} className="rounded-[6px]">
//           <Icons.facebook2 className="min-w-6 min-h-6" />
//         </Button>
//         <Button variant={"secondary"} className="rounded-[6px]">
//           <Icons.instagram2 className="min-w-6 min-h-6" />
//         </Button>
//       </div>
//     </div>
//   );
// }

import { Button } from "../../ui/button";
import Icons from "../../ui/icons";

interface SocialLinksProps {
  user: {
    social_links?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
}

const SOCIAL_CONFIG = [
  { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
  { key: "github", icon: "github", label: "GitHub" },
  { key: "twitter", icon: "twitter", label: "Twitter" },
  { key: "facebook", icon: "facebook2", label: "Facebook" },
  { key: "instagram", icon: "instagram2", label: "Instagram" },
] as const;

export default function SocialLinks({ user }: SocialLinksProps) {
  const links = user?.social_links || {};
  const hasLinks = Object.values(links).some(Boolean);

  return (
    <div className="flex flex-col gap-4 border-b pb-4 rounded-[6px] w-full">
      <h2 className="font-medium text-[#1B1B1C]">Social Media</h2>

      {hasLinks ? (
        <div className="flex gap-2.5 flex-wrap">
          {SOCIAL_CONFIG.map(({ key, icon, label }) => {
            const url = links[key];
            if (!url) return null;

            const IconComponent = (Icons as any)[icon];

            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={label}>
                <Button
                  variant="secondary"
                  className="rounded-[6px]"
                  type="button">
                  {IconComponent && (
                    <IconComponent className="min-w-6 min-h-6" />
                  )}
                </Button>
              </a>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No social links added yet</p>
      )}
    </div>
  );
}