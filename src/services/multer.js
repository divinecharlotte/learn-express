import multer from "multer";
import path from "path";

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".JPG" && ext !== ".jpeg" && ext !== ".PNG") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});