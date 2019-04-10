const multiparty = require('multiparty'),
    to = require('await-to-js').default,
    utils = require('../../helpers/utils'),
    FileStorage = require('./helpers'),
    Compressor = require("./helpers/compress");

module.exports.upload = (req) => {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form({ uploadDir: '.' });
        form.parse(req, async (error, fields, data) => {
          var files = data.files;
            if (error) {
                reject(error);
            }
            const options = {
                fileName: files[0].originalFilename,
                path: files[0].path,
                contentType: files[0].headers['content-type']
            }
            if (global.CONFIG.fileStorage.useCompression) {
                const random = utils.random(6);
                options.compressPath = './' + random;
                options.compressPathFull = './' + random + options.path.substring(options.path.lastIndexOf('/') + 1);
                const [error, completed] = await to(Compressor.compress({ srcPath: options.path, dstPath: options.compressPath }));
                if (error) {
                    options.compressPath = null;
                    options.compressPathFull = null;
                }
            }
            const [err, file] = await to(FileStorage.write(options));
            err ? reject(err) : resolve(file.ETag ? file : { _id: options.path });
            
        });
    })
}

module.exports.read = (id) => {
    return FileStorage.read(id);
}

module.exports.unlink = (id) => {
    return FileStorage.unlink(id);
}