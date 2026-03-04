import { Button } from "../../ui/button";
import Icons from "../../ui/icons";
import { toast } from "sonner";
import { useState } from "react";

export default function ShareJob({ job }: { job: any }) {
  const [isCopied, setIsCopied] = useState(false);

  // Construct the job URL - adjust this based on your routing structure
  const jobUrl = `${window.location.origin}/jobs/${job.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");

      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const handleShare = (platform: string) => {
    let shareUrl = "";

    // Encode the job title and URL for sharing
    const text = encodeURIComponent(
      `Check out this job: ${job.title} at ${job.company.name}`,
    );
    const url = encodeURIComponent(jobUrl);

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      default:
        return;
    }

    // Open share dialog in a new window
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  // For mobile devices with native share support
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.company.name}`,
          url: jobUrl,
        });
        toast.success("Job shared successfully!");
      } catch (err) {
        // User cancelled share or share failed - don't show error for cancellation
        if (err instanceof Error && err.name !== "AbortError") {
          toast.error("Failed to share job");
        }
      }
    } else {
      // Fallback to copy link if native share not supported
      handleCopyLink();
    }
  };

  return (
    <div className="flex flex-col gap-4 border rounded-[6px] p-4 w-full">
      <h2 className="font-medium text-[#1B1B1C]">Share this Job</h2>
      <div className="flex gap-2.5 flex-wrap">
        <Button
          variant={"secondary"}
          className="rounded-[6px] gap-2"
          onClick={handleCopyLink}>
          <Icons.copy className="min-w-6 min-h-6" />
          {isCopied ? "Copied!" : "Copy link"}
        </Button>

        <Button
          variant={"secondary"}
          className="rounded-[6px]"
          onClick={() => handleShare("facebook")}
          title="Share on Facebook">
          <Icons.facebook2 className="min-w-6 min-h-6" />
        </Button>

        <Button
          variant={"secondary"}
          className="rounded-[6px]"
          onClick={() => handleShare("twitter")}
          title="Share on Twitter">
          <Icons.twitter className="min-w-6 min-h-6" />
        </Button>

        <Button
          variant={"secondary"}
          className="rounded-[6px]"
          onClick={() => handleShare("linkedin")}
          title="Share on LinkedIn">
          <Icons.linkedin className="min-w-6 min-h-6" />
        </Button>

        {/* Native share button for mobile - using copy icon as fallback */}
        {navigator.share && (
          <Button
            variant="secondary"
            className="rounded-[6px] md:hidden"
            onClick={handleNativeShare}
            title="Share via...">
            <Icons.link className="min-w-6 min-h-6" />
          </Button>
        )}
      </div>

      {/* Optional: Show the job URL */}
      {/* <p className="text-sm text-gray-500 mt-2 break-all">{jobUrl}</p> */}
    </div>
  );
}





// import { Button } from "../../ui/button";
// import Icons from "../../ui/icons";
// import { toast } from "sonner";
// import { useState, useCallback, useMemo } from "react";

// interface Company {
//   name: string;
// }

// interface Job {
//   id: string | number;
//   title: string;
//   company: Company;
// }

// interface Props {
//   job: Job;
// }

// export default function ShareJob({ job }: Props) {
//   const [isCopied, setIsCopied] = useState(false);

//   const jobUrl = useMemo(
//     () => `${window.location.origin}/jobs/${job.id}`,
//     [job.id],
//   );

//   const shareText = useMemo(
//     () =>
//       encodeURIComponent(
//         `Check out this job: ${job.title} at ${job.company.name}`,
//       ),
//     [job.title, job.company.name],
//   );

//   const handleCopyLink = useCallback(async () => {
//     try {
//       await navigator.clipboard.writeText(jobUrl);
//       setIsCopied(true);
//       toast.success("Link copied to clipboard!");
//       setTimeout(() => setIsCopied(false), 2000);
//     } catch {
//       toast.error("Failed to copy link. Please try again.");
//     }
//   }, [jobUrl]);

//   const shareUrls: Record<string, string> = useMemo(() => {
//     const encodedUrl = encodeURIComponent(jobUrl);
//     return {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${shareText}`,
//       twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
//       whatsapp: `https://wa.me/?text=${shareText}%20${encodedUrl}`,
//     };
//   }, [jobUrl, shareText]);

//   const handleShare = useCallback(
//     (platform: string) => {
//       const url = shareUrls[platform];
//       if (!url) return;
//       window.open(url, "_blank", "width=600,height=400");
//     },
//     [shareUrls],
//   );

//   const handleNativeShare = useCallback(async () => {
//     if (!navigator.share) return handleCopyLink();

//     try {
//       await navigator.share({
//         title: job.title,
//         text: `Check out this job: ${job.title} at ${job.company.name}`,
//         url: jobUrl,
//       });
//       toast.success("Job shared successfully!");
//     } catch (err) {
//       if (err instanceof Error && err.name !== "AbortError") {
//         toast.error("Failed to share job");
//       }
//     }
//   }, [job.title, job.company.name, jobUrl, handleCopyLink]);

//   const platforms: Array<{
//     id: string;
//     title: string;
//     icon: React.ReactNode;
//   }> = [
//     {
//       id: "facebook",
//       title: "Share on Facebook",
//       icon: <Icons.facebook2 className="min-w-6 min-h-6" />,
//     },
//     {
//       id: "twitter",
//       title: "Share on Twitter",
//       icon: <Icons.twitter className="min-w-6 min-h-6" />,
//     },
//     {
//       id: "linkedin",
//       title: "Share on LinkedIn",
//       icon: <Icons.linkedin className="min-w-6 min-h-6" />,
//     },
//     // whatsapp can be added if needed
//   ];

//   return (
//     <div className="flex flex-col gap-4 border rounded-[6px] p-4 w-full">
//       <h2 className="font-medium text-[#1B1B1C]">Share this Job</h2>
//       <div className="flex gap-2.5 flex-wrap">
//         <Button
//           variant="secondary"
//           className="rounded-[6px] gap-2"
//           onClick={handleCopyLink}>
//           <Icons.copy className="min-w-6 min-h-6" />
//           {isCopied ? "Copied!" : "Copy link"}
//         </Button>

//         {platforms.map(({ id, title, icon }) => (
//           <Button
//             key={id}
//             variant="secondary"
//             className="rounded-[6px]"
//             onClick={() => handleShare(id)}
//             title={title}>
//             {icon}
//           </Button>
//         ))}

//         {/* {navigator.share && (
//           <Button
//             variant="secondary"
//             className="rounded-[6px] md:hidden"
//             onClick={handleNativeShare}
//             title="Share via...">
//             <Icons.link className="min-w-6 min-h-6" />
//           </Button>
//         )} */}
//       </div>

//       {/* Optional: Show the job URL */}
//       {/* <p className="text-sm text-gray-500 mt-2 break-all">{jobUrl}</p> */}
//     </div>
//   );
// }