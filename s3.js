
//import dotenv from 'dotenv'
const dotenv = require("dotenv")

const aws = require('aws-sdk');


//import crypto from 'crypto'
const crypto = require('crypto');

//import { promisify } from "util"
const {promisify} = require('util');

const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "us-east-1"
const bucketName = "avatars-s3-upload-bucket"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

async function generateUploadURL() {
  //generate unique name for each uploaded img
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')
  console.log("imagename:"+ imageName)

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  console.log("upload url:" + uploadURL)
  return uploadURL
}

module.exports = {generateUploadURL} 


