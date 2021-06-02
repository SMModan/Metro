import Amplify, { Storage } from 'aws-amplify'
import RNFetchBlob from 'rn-fetch-blob';
import buffer from 'buffer'
import { RNS3 } from 'react-native-s3-upload';

global.Buffer = buffer.Buffer

const BUCKET_NAME = 'digipay-assets'
const REGION = 'us-east-1'
const POOL_ID = 'us-east-1:77c33bc7-17dd-43a8-aabb-4fea5444271b'

const options = {
    bucket: "digipay-assets",
    region: "us-east-1",
    accessKey: "AKIATDFDERAALGD4RDI2",
    secretKey: "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",
    successActionStatus: 201
}

export const configureAWS = () => {
    Amplify.configure({
        Auth: {
            identityPoolId: POOL_ID, //REQUIRED - Amazon Cognito Identity Pool ID
            region: REGION, // REQUIRED - Amazon Cognito Region

        },
        Storage: {
            AWSS3: {
                bucket: BUCKET_NAME, //REQUIRED -  Amazon S3 bucket
                region: REGION, //OPTIONAL -  Amazon service region
                identityPoolId: POOL_ID,

            }
        }
    })
}

const mimeTypes = {

    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    txt: 'text/plain'
}


export const uploadFile = async (uri, extention) => {

    try {



        // if (!isExist)
        //     return uri
        console.log('File uri', uri)
        let type = ''
        let filename = Math.random().toString(36).substring(7) + '.' + extention;
        type = mimeTypes[extention];
        let path
        if (!extention) {
            const stat = await RNFetchBlob.fs.stat(uri)
            console.log('File Info', stat)
            path = stat.originalFilepath || stat.path
            extention = path.substr(path.lastIndexOf(".") + 1);
            if (!extention.startsWith('jpg') && !extention.startsWith('pdf') && !extention.startsWith('jpeg') && !extention.startsWith('png'))
                extention = 'jpg'
            filename = Math.random().toString(36).substring(7) + '.' + extention;
            type = mimeTypes[extention];
        } else {

            type = mimeTypes[extention];
        }

        //const buffer = await readFile(uri);


        const file = {
            uri: `file://${path || uri}`,
            name: filename,
            type: type
        }
        // const response = await Storage.put(filename, buffer, {
        //     level: BUCKET_NAME,
        //     contentType: type
        // })

        const response = await RNS3.put(file, options);
        if (response.status !== 201)
            throw new Error("Failed to upload image to S3");

        console.log(response.body);
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */

        // console.log(response)

        return response.body.postResponse.location//`https://s3.${REGION}.amazonaws.com/${BUCKET_NAME}/${filename}`

    } catch (err) {
        console.log(err)

        return uri
    }
}

export const uploadFiles = async (files) => {

    try {

        let paths = await Promise.all(await files.map(async (value) => {

            await uploadFile(value.uri)

        }))



        console.log(paths)

        return paths


    } catch (err) {

        console.log(err)
        return []
    }
}


const readFile = (filePath) => {
    return RNFetchBlob.fs.readFile(filePath, 'base64').then(data => new Buffer.from(data, 'base64'));
}

