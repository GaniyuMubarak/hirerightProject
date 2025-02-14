import requests from "./https-services";

const FileServices = {
  getFile: async (fileId: string) => {
    return requests.get(`/files/${fileId}`);
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
