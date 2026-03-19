import { createStoragePlugin } from "@hot-updater/plugin-core";

export const customStorage = createStoragePlugin({
  name: "customStorage",
  supportedProtocol: "http",
  factory: (config) => {
    return {
      async upload(key, filePath) {
        return {
          storageUri: "",
        };
      },
      async delete(storageUri) {},
      async getDownloadUrl(storageUri) {
        return {
          fileUrl: "",
        };
      },
    };
  },
});
