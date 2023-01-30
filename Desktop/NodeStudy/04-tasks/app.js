const { inquirerMenu, pause, readInput, getDataDelete, confirm, showData } = require('./helper/inquirer');
const { saveData, readData } = require('./helper/save_file');
const Tasks = require('./models/tasks');

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksData = readData();

    if (tasksData) {
        tasks.getTaskFromArr(tasksData);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Descripción:');
                tasks.addTask(desc);
                break;
            case '2':
                tasks.getAll();
                break;
            case '3':
                tasks.getTasksByStatus(true);
                break;
            case '4':
                tasks.getTasksByStatus(false);
                break;
            case '5':
                const ids = await showData(tasksData);
                tasks.toggleDone(ids);
                break;
            case '6':
                const id = await getDataDelete(tasksData);
                if (id !== '0') {
                    const isConfirm = await confirm('¿Estás seguro de borrar este registro?')
                    if (isConfirm) {
                        tasks.deleteTask(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        saveData(tasks.listArr);
        await pause();

    } while (opt !== '0')

}

main();