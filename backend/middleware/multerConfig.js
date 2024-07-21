import multer from "multer";
import path from "path";

//Configuração do multer para armazenamento de imagens
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

const fileFilter = (req, file, cb) => {
	if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
		cb(null, true);
	} else {
		cb(new Error("Formato de arquivo inválido. Aceito somente formato JPEG e PNG."), false);
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;