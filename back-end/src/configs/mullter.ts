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

const StorageDepositionsAvatars = multer.diskStorage({
  destination: uploadFolderDepositionsAvatars,
  filename: function (req, file, callback) {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    return callback(null, fileName);
  },
});

export default { StorageDepositionsAvatars };
