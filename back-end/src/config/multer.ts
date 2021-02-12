import path from "path";
import crypto from "crypto";
import multer, { StorageEngine } from "multer";

const uploadsFolder = path.resolve(__dirname, "..", "..", "uploads");

interface IUploadConfig {
  uploadsFolder: string;

  multerStorageImageCity: {
    storage: StorageEngine;
  };
  multerStorageImagePlace: {
    storage: StorageEngine;
  };
  multerStorageAvatarEvaluation: {
    storage: StorageEngine;
  };
}

export default {
  uploadsFolder,

  multerStorageImageCity: {
    storage: multer.diskStorage({
      destination: path.resolve(uploadsFolder, "cities"),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  multerStorageImagePlace: {
    storage: multer.diskStorage({
      destination: path.resolve(uploadsFolder, "places"),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  multerStorageAvatarEvaluation: {
    storage: multer.diskStorage({
      destination: path.resolve(uploadsFolder, "evaluations"),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
} as IUploadConfig;
