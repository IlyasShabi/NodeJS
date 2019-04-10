
const Compressor = require('compress-images'),
    options = { compress_force: false, statistic: true, autoupdate: true },
    enginejpg = { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
    enginepng = { png: { engine: 'pngquant', command: ['--quality=20-50'] } },
    enginesvg = { svg: { engine: 'svgo', command: '--multipass' } },
    enginegif = { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } }

module.exports.compress = (params) => {
    return new Promise((resolve, reject) => {
        Compressor(params.srcPath, params.dstPath, options, false, enginejpg, enginepng, enginesvg, enginegif, (err, completed) => {
            err ? reject(err) : resolve(completed);
        });
    })
}
