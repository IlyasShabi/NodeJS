let fs = require('fs'),
    _ = require('underscore'),
    mongoose = require('mongoose'),
    gridfs = require('mongoose-gridfs')({
        collection: 'attachments',
        model: 'Attachment',
        mongooseConnection: mongoose.connection
    }),
    Attachment = gridfs.model;

/**
* @param {options} object : file info (path, type, etc...)
* returns a promise : created file info
*/
module.exports.write = (options) => {
    return new Promise((resolve, reject) => {
        Attachment.write(
            { filename: options.fileName, contentType: options.contentType },
            fs.createReadStream(options.compressPathFull || options.path),
            (err, createdFile) => {
                fs.unlink(options.path, _.noop);
                if (options.compressPathFull) {
                    fs.unlink(options.compressPathFull, _.noop);
                }
                err ? reject(err) : resolve(createdFile);
            }
        );
    });
};

/**
 * @param {id} string : file id
 * returns a Stream
 */
module.exports.read = (id) => {
    return Attachment.readById(id);
};

/**
 * @param {id} string : file id
 * returns a promise
 */
module.exports.unlink = (id) => {
    return new Promise((resolve, reject) => {
        Attachment.unlinkById(
            id,
            (err, unlinkedAttachment) => { err ? reject(err) : resolve(unlinkedAttachment) }
        );
    });
};