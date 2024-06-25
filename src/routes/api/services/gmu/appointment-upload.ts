import * as fs from 'fs';
import * as aws from "@aws-sdk/client-s3";
import { BUCKET_NAME } from '$env/static/private';
import { ACCESS_KEY_ID } from '$env/static/private';
import { SECRET_ACCESS_KEY } from '$env/static/private';
import { BUCKET_REGION } from '$env/static/private';

////////////////////////////////////////////////////////////////////

const getS3Client = (): aws.S3 => {
    return new aws.S3({
        credentials : {
            accessKeyId     : ACCESS_KEY_ID,
            secretAccessKey : SECRET_ACCESS_KEY
        },
        region : BUCKET_REGION
    });
};

export const uploadAppoinmentPdf = async (fileName: string, filePath: string) => {
    const s3 = getS3Client();

    const bucketName = BUCKET_NAME;
    const filePathOnS3 = `${fileName}`; // Replace with your desired path and filename
    const fileContent = fs.createReadStream(filePath); // Replace with the content or buffer of your file

    const params = {
        Bucket: bucketName,
        Key: filePathOnS3,
        Body: fileContent
    };

    try {
        const command = new aws.PutObjectCommand(params);
        const response = await s3.send(command);
        console.log('response', JSON.stringify(response, null, 2));
        return {
            status: 200,
            body: { success: true, message: 'File uploaded successfully to S3.' }
        };
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        return {
            status: 500,
            body: { success: false, message: 'Error uploading file to S3.' }
        };
    }
};
