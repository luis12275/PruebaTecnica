// src/services/storageService.js
const { S3 } = require('@aws-sdk/client-s3'); // Importamos el cliente de S3 desde v3
const { Upload } = require('@aws-sdk/lib-storage');

const s3 = new S3({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadImage = async (file) => {
    const fileName = file.filename || `image-${Date.now()}`;
    const params = {
      Bucket: 'imagenes-usuario',
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      // Eliminamos la propiedad ACL
    };
  
    try {
      const result = await s3.putObject(params); // Usamos `putObject` o `upload`
      return result;
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

module.exports = {
    uploadImage,
};
