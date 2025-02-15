import requests from "./https-services";

const FileServices = {
  getFile: async (fileId: string) => {
    return requests.get(`/files/${fileId}`);
  },
  getEntityFile: async (entity: string, entity_id: string) => {
    return requests.get(
      `/entity/files?entity_type=${entity}&entity_id=${entity_id}`
    );
  },

  initUpload: async (body: any) => {
    return requests.post(`/upload/init`, body);
  },

  confirmUpload: async (body: { file_id: string }) => {
    return requests.put(`/upload/confirm`, body);
  },

  deleteFile: async (fileId: string) => {
    return requests.delete(`/files/${fileId}`);
  },
};

export default FileServices;
