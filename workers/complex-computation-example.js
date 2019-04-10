const schemas = ['user'],
    models = require(__dirname + "/workers")(schemas);

onmessage = function (ev) {
    doWork(ev.data);
};

const sendMessage = function (data) {
    postMessage(data);
    process.exit(0);
};

const doWork = async (inputs) => {
    // Put the logic here
    const data = await models.user.count();
    let sum = 0;
    for(let i=0; i< Math.pow(10,10);i++){
        sum+=i;
    }
    sendMessage({data, sum});
}

process.on("SIGTERM", () => process.exit(0))
process.on("SIGINT", () => process.exit(0))




