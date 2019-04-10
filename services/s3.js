const AWS3 = require('aws-sdk/clients/s3'),
    fs = require('fs'),
    _ = require('underscore'),
    S3 = new AWS3(global.CONFIG.fileStorage.s3);

module.exports.write = (options) => {
    const readStream = fs.createReadStream(options.compressPathFull || options.path);
    const params = {
        Bucket: global.CONFIG.fileStorage.s3.bucket,
        Key: options.path.substring(options.path.lastIndexOf('/') + 1),
        Body: readStream
    };
    readStream.on('close', () => {
        fs.unlink(options.path, _.noop);
        if (options.compressPathFull) {
            fs.unlink(options.compressPathFull, _.noop);
        }
    });
    return S3.upload(params).promise();
};

module.exports.unlink = (id) => {
    var params = {
        Bucket: global.CONFIG.fileStorage.s3.bucket,
        Key: id
    };
    return S3.deleteObject(params).promise();
};