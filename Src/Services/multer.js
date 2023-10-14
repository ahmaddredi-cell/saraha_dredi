import multer from "multer";
import { nanoid } from "nanoid";
export const fileValidation = {
  image: ["image/avif", "image/bmp", "image/gif", "image/jpeg", "image/png", "image/webp"],
  file: ["application/pdf"],
};

function fileUpload(customValidation = []) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload");
    },
    filename: (req, file, cb) => {
      cb(null, nanoid() + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid format", false);
    }
  }

  const upload = multer({ fileFilter, storage });
  return upload;
}
export default fileUpload;
