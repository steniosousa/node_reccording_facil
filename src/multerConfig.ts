import multer from 'multer';

const storage = multer.memoryStorage(); // Armazenamento na memória
const upload = multer({ storage: storage });

export default upload;
