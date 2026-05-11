import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("The File is not an Image"), false);
    }
};

export const upload = multer({ 
    storage, 
    fileFilter ,
    limits: {
    fileSize: 2 * 1024 * 1024 
  }
});