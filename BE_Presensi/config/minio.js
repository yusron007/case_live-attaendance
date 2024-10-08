const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'root',
  secretKey: 'root1234'
});

const bucketName = 'casepresensi';

minioClient.bucketExists(bucketName, function(err) {
  if (err && err.code === 'NoSuchBucket') {
    minioClient.makeBucket(bucketName, 'us-east-1', function(err) {
      if (err) return console.log('Error creating bucket.', err);
      console.log('Bucket created successfully in "us-east-1".');
    });
  } else if (err) {
    console.log('Error checking bucket existence.', err);
  } else {
    console.log('Bucket already exists.');
  }
});

module.exports = { minioClient, bucketName };
