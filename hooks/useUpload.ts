import GLOBAL_CONFIG from "../pages/config/global.config.json";
import { S3 } from "aws-sdk";

const useUploader = () => {
  const s3 = new S3({
    accessKeyId: GLOBAL_CONFIG.AWS_ACCESS_KEY_ID,
    secretAccessKey: GLOBAL_CONFIG.AWS_SECRET_ACCESS_KEY,
    region: GLOBAL_CONFIG.AWS_REGION,
  });
  return async (files: any) => {
    console.log(GLOBAL_CONFIG);

    const uploadFileToS3 = async (file: any) => {
      const params = {
        Key: file.name,
        Body: file,
        Bucket: GLOBAL_CONFIG.AWS_BUCKET_NAME,
        ContentType: file?.type,
      };
      return await s3.upload(params).promise();
    };

    const s3UploadPromises = files.map((file: any) => uploadFileToS3(file));
    const fileArray = Promise.all(s3UploadPromises)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
      });

    return (await fileArray) || [];
  };
};

export default useUploader;
