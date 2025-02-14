import FileServices from "@/services/file-services";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

type PendingUploads = {
  file: File;
  previewUrl: string;
  isPending: boolean;
  url: string;
  name: string;
  type: string;
  size: string;
};

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadPendingFile = async ({
    files,
    entityType,
    entity_id,
  }: {
    files: PendingUploads[];
    entityType: string;
    entity_id: string;
  }) => {
    try {
      setIsUploading(true);
      for (const file of files) {
        // 1. Initialize upload
        const initResponse = await FileServices.initUpload({
          files: [
            {
              name: file.name,
              type: file.type,
              size: file.size,
            },
          ],
          entity_type: entityType,
          entity_id: entity_id,
          needs_thumbnail: true,
          visibility: "private",
        });

        await Promise.all(
          initResponse.uploads.map(
            async (upload: { file_id: string; upload_url: string }) => {
              const formData = new FormData();
              formData.append("file", file.file);

              // 2. Upload file
              await fetch(upload.upload_url, {
                method: "PUT",
                body: file.file,
              });

              // 3. Confirm upload
              await FileServices.confirmUpload({
                file_id: upload.file_id,
              });
            }
          )
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Failed to upload images: " + error.message);
      }
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (fileId: string) => {
    try {
      await FileServices.deleteFile(fileId);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error("Failed to delete image: " + error.message);
      }
      toast.error("Failed to delete image");
    }
  };

  return {
    uploadPendingFile,
    deleteImage,
    isUploading,
  };
};
