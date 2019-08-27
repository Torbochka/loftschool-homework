const util = require('util');
const exec = util.promisify(require('child_process').exec);

/*
 Задание 2:

 Дан массив из однообразных консольных команд:

 var cmds = ['echo 1', 'echo 2', 'echo 3', ...].

 Напишите код, выполняющий их последовательно, но использующий асинхронный API, например, child_process.exec() в NodeJS.
 */

const commands = (...cmds) => {
    cmds.forEach(async cmd => {
        const { stdout, stderr } = await exec(cmd);

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
};

commands('echo 1', 'echo 2', 'echo 3');