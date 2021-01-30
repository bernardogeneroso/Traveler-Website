import path from "path";
import multer from "multer";
import crypto from "crypto";

const uploadFolderDepositionsAvatars = path.resolve(
  __dirname,
  "..",
  "uploads",
  "despositions",
  "avatars"
);

const uploadFolderCitiesImage = path.resolve(
  __dirname,
  "..",
  "uploads",
  "cities"
);

const uploadFolderPlacesImage = path.resolve(
  __dirname,
  "..",
  "uploads",
  "places"
);

const StorageDepositionsAvatars = multer.diskStorage({
  destination: uploadFolderDepositionsAvatars,
  filename: function (req, file, callback) {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    return callback(null, fileName);
  },
});

const StorageCitiesImage = multer.diskStorage({
  destination: uploadFolderCitiesImage,
  filename: function (req, file, callback) {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    return callback(null, fileName);
  },
});

const StoragePlacesImage = multer.diskStorage({
  destination: uploadFolderPlacesImage,
  filename: function (req, file, callback) {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    return callback(null, fileName);
  },
});

export default {
  StorageDepositionsAvatars,
  StorageCitiesImage,
  StoragePlacesImage,
};
