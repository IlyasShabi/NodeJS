let Worker = require("tiny-worker");

let worker = new Worker('./workers/complex-computation-example.js');


worker.postMessage({data : 'xxx'});


worker.onmessage = (data) => {
    console.log('Received From Child', data);
    worker.terminate();
};
