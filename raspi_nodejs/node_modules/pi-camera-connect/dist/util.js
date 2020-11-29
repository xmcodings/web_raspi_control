"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
exports.spawnPromise = (command, args, options) => new Promise((resolve, reject) => {
    const childProcess = child_process_1.spawn(command, args !== null && args !== void 0 ? args : [], options !== null && options !== void 0 ? options : {});
    let stdoutData = Buffer.alloc(0);
    let stderrData = Buffer.alloc(0);
    if (!childProcess.stdout) {
        throw new Error(`No 'stdout' available on spawned process '${command}'`);
    }
    if (!childProcess.stderr) {
        throw new Error(`No 'stderr' available on spawned process '${command}'`);
    }
    childProcess.once('error', (err) => reject(err));
    childProcess.stdout.on('data', (data) => (stdoutData = Buffer.concat([stdoutData, data])));
    childProcess.stdout.once('error', (err) => reject(err));
    childProcess.stderr.on('data', (data) => (stderrData = Buffer.concat([stderrData, data])));
    childProcess.stderr.once('error', (err) => reject(err));
    childProcess.stdout.on('close', () => {
        if (stderrData.length > 0)
            return reject(new Error(stderrData.toString()));
        return resolve(stdoutData);
    });
});
//# sourceMappingURL=util.js.map