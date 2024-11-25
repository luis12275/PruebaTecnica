const multer = require('multer');

const storage = multer.memoryStorage(); // Almacena el archivo en memoria temporal
const upload = multer({ storage });

module.exports = upload;