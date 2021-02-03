import path from "path";
import multer from "multer";
import crypto from "crypto";

const uploadFolderEvaluationsAvatars = path.resolve(
  __dirname,
  "..",
  "uploads",
  "evaluations",
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

const StorageEvaluationsAvatars = multer.diskStorage({
  destination: uploadFolderEvaluationsAvatars,
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
  StorageEvaluationsAvatars,
  StorageCitiesImage,
  StoragePlacesImage,
};
