import fs from "fs";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;
const awsLink = process.env.AWS_S3_BASE_URL;

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

export async function getArchive(key) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  const res = await s3.send(new GetObjectCommand(params));
  const stream = res.Body.transformToString();
  return stream;
}

export async function sendArchive(file, name) {
  const key = name + uuidv4();
  const contentType = file.split(";base64")[0];
  const params = {
    Bucket: bucketName,
    Body: file,
    Key: key,
    ContentType: contentType.substring(5),
  };

  await s3.send(new PutObjectCommand(params));
  const fileUrl = `${awsLink}${bucketName}/${key}`;

  return fileUrl;
}

export async function deleteArchive(key) {
  if (!key) return;

  const params = {
    Bucket: bucketName,
    Key: key,
  };
  await s3.send(new DeleteObjectCommand(params));
}
