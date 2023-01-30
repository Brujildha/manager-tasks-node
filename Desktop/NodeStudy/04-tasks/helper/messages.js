const showMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('=====Seleccione una opción=====');
        console.log('1. Crear tarea');
        console.log('2. Listar tarea');
        console.log('3. Listar tarea completadas');
        console.log('4. Listar tarea pendientes');
        console.log('5. Completar tarea');
        console.log('6. Borrar tarea');
        console.log(`0. Salir \n`);
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`Seleccione una opción: `, (opt) => {
            readline.close();
            resolve(opt);
        })
    });
}
const pause = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\n Presione enter para continuar \n`, (opt) => {
            readline.close();
            resolve();
        })
    });
}

module.exports = {
    showMenu,
    pause
}