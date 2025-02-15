import requests from "./https-services";

const FileServices = {
  getFile: async (fileId: string) => {
    return requests.get(`/storage/files/${fileId}`);
  },
  getEntityFile: async (entity: string, entity_id: string) => {
    return requests.get(
      `/storage/entity/files?entityType=${entity}&entityId=${entity_id}`
    );
  },

  initUpload: async (body: any) => {
    return requests.post(`/storage/upload/init`, body);
  },

  confirmUpload: async (body: { file_id: string }) => {
    return requests.put(`/storage/upload/confirm`, body);
  },

  deleteFile: async (fileId: string) => {
    return requests.delete(`/storage/files/${fileId}`);
  },
};

export default FileServices;
