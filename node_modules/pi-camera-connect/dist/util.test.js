"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
test('spawnPromise() returns stdout from child process', async () => {
    const textToPrint = 'Hello world!';
    const echoData = await util_1.spawnPromise('printf', [textToPrint]);
    expect(echoData.toString('ascii')).toBe(textToPrint);
});
test('spawnPromise() throws error when child process prints to stderr', () => {
    const textToPrint = 'This should be an error!';
    const promise = util_1.spawnPromise('/bin/sh', ['-c', `printf "${textToPrint}" 1>&2`]);
    expect(promise).rejects.toMatchObject(new Error(textToPrint));
});
//# sourceMappingURL=util.test.js.map