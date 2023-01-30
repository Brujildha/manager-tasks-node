const Task = require("./task");


class Tasks {
    _list = {};
    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });
        return list;
    }
    constructor() {
        this._list = {};
    }
    getTaskFromArr(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }
    getAll() {
        this.listArr.forEach((task, i) => {
            const idx = `${i + 1}`;
            const { desc, doneDate } = task;
            const status = (doneDate)
                ? 'Completada'
                : 'Pendiente'
            console.log(`${idx} ${desc} :: ${status}`);
        });
    }
    getTasksByStatus(done = true) {
        let count = 0;

        this.listArr.forEach((task) => {
            const { desc, doneDate } = task;
            if (done && doneDate) {
                count++;
                console.log(`${count} ${desc} :: ${doneDate}`);

            } else if (!done && !doneDate) {
                count++;
                const status = 'Pendiente';
                console.log(`${count} ${desc} :: ${status}`);
            }
        });
    }
    addTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }
    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }

    }
    toggleDone(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.doneDate) {
                task.doneDate = new Date().toISOString();
            }
        });
        this.listArr.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].doneDate = null;
            }
        });
    }
}
module.exports = Tasks;