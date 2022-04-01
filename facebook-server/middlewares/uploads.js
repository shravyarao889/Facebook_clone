const multer = require('multer');

//Module response for validate and upload images to our server 

//type of images (validate images )
const FILE_TYPE_MAP = {
    "image/png" : "png",
    "image/jpeg" : "jpeg",
    "image/jpg" : "jpg"
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // check image type is valid or not by compare it type with our types (defined above )
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("invalid Image Type");
        if(isValid) uploadError = null
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(' ' , '-'); 
        const extention = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extention}`);
    }
})
const uploadOptions = multer({ storage: storage });

module.exports = uploadOptions;