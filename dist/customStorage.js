import { createStoragePlugin, getContentType, parseStorageUri, } from "@hot-updater/plugin-core";
import fs from "fs/promises";
import path from "path";
export const customStorage = createStoragePlugin({
    name: "customStorage",
    supportedProtocol: "http",
    factory: (config) => {
        const { bucketName } = config;
        return {
            async upload(key, filePath) {
                const Body = await fs.readFile(filePath);
                const ContentType = getContentType(filePath);
                const filename = path.basename(filePath);
                const Key = `${key}/${filename}`;
                // save the file to a local path on the server instead of third party
                // and store the key to point to this file on the database
                // return the key
                return {
                    storageUri: `http://${bucketName}/${Key}`,
                };
            },
            async delete(storageUri) {
                const { bucket, key } = parseStorageUri(storageUri, "http");
                if (bucket !== bucketName) {
                    throw new Error(`Bucket mismatch: expected "${bucketName}"`);
                }
                // delete the file on the local path by getting the url using the key
            },
            async getDownloadUrl(storageUri) {
                const url = new URL(storageUri);
                const bucket = url.host;
                const key = url.pathname.slice(1);
                // get a download url for the storage uri by using the key
                const signedUrl = "todo";
                return { fileUrl: signedUrl };
            },
        };
    },
});
// import {
//   DeleteObjectCommand,
//   GetObjectCommand,
//   S3Client,
// } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import {
//   createStoragePlugin,
//   getContentType,
//   parseStorageUri,
// } from "@hot-updater/plugin-core";
// import fs from "fs/promises";
// import path from "path";
// export interface CustomStorageConfig {
//   region: string;
//   credentials: {
//     accessKeyId: string;
//     secretAccessKey: string;
//   };
//   bucketName: string;
// }
// export const customStorage = createStoragePlugin<CustomStorageConfig>({
//   name: "customStorage",
//   supportedProtocol: "s3",
//   factory: (config) => {
//     const { bucketName, ...s3Config } = config;
//     const client = new S3Client(s3Config);
//     return {
//       async upload(key, filePath) {
//         const Body = await fs.readFile(filePath);
//         const ContentType = getContentType(filePath);
//         const filename = path.basename(filePath);
//         const Key = `${key}/${filename}`;
//         const upload = new Upload({
//           client,
//           params: {
//             Bucket: bucketName,
//             Key,
//             Body,
//             ContentType,
//           },
//         });
//         await upload.done();
//         return {
//           storageUri: `s3://${bucketName}/${Key}`,
//         };
//       },
//       async delete(storageUri) {
//         const { bucket, key } = parseStorageUri(storageUri, "s3");
//         if (bucket !== bucketName) {
//           throw new Error(`Bucket mismatch: expected "${bucketName}"`);
//         }
//         const command = new DeleteObjectCommand({
//           Bucket: bucketName,
//           Key: key,
//         });
//         await client.send(command);
//       },
//       async getDownloadUrl(storageUri) {
//         const url = new URL(storageUri);
//         const bucket = url.host;
//         const key = url.pathname.slice(1);
//         const command = new GetObjectCommand({ Bucket: bucket, Key: key });
//         const signedUrl = await getSignedUrl(client, command, {
//           expiresIn: 3600,
//         });
//         return { fileUrl: signedUrl };
//       },
//     };
//   },
// });
