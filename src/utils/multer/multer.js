import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/books");
  },
  filename: (req, file, cb) => {
    file && cb(null, uuidv4()+Date.now() + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("The File is not Image "), false); // (إرسال إيرور) ، (الموافقة = false)
//   }
// };

export const upload = multer({
  storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024, // الحد الأقصى 2 ميجا بايت
//   },
});
