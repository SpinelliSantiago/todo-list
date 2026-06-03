const taskInput = document.querySelector("#task_input")
const addTask = document.querySelector("#add_task")
const tasksList = document.querySelector(".tasks_list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// MOSTRAR TAREAS GUARDADAS
tasks.forEach((task) => {

    const taskHTML = `<div class="tasks_items ${task.completed ? "completed-task" : ""}"" >
                        <div class="tasks_left">
                            <i class="${task.completed? "ri-checkbox-circle-fill": "ri-checkbox-blank-circle-line"}"></i>
                            <p>${task.text}</p>
                        </div>

                        <div class="tasks_icons">
                            <i class="ri-delete-bin-line"></i>
                        </div>
                    </div>`

    tasksList.innerHTML += taskHTML;
})

// SUMAR TAREAS
addTask.addEventListener("click", () => {

    const taskText = taskInput.value;

    if(taskText === "") return;

    tasks.push({
        text: taskText,
        completed: false,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks))
    const taskHTML = `<div class="tasks_items">
                        <div class="tasks_left">
                            <i class="ri-checkbox-blank-circle-line"></i>
                            <p>${taskText}</p>
                        </div>

                        <div class="tasks_icons">
                            <i class="ri-delete-bin-line"></i>
                        </div>
                    </div>`

    tasksList.innerHTML += taskHTML;
    taskInput.value = "";

})

// MODAL DELETE
const modal = document.querySelector(".modal");
const closeModalDelete = document.querySelector(".close_modal_delete");
const closeModalCancel = document.querySelector(".close_modal_cancel");
let taskToDelete = null;

document.addEventListener("click", (e) => {

    if(e.target.classList.contains("ri-delete-bin-line")) {

        modal.classList.add("active");

        taskToDelete = e.target.parentElement.parentElement;
    }
});

closeModalCancel.addEventListener("click", () => {
    modal.classList.remove("active");

    taskToDelete = null;
});

closeModalDelete.addEventListener("click", () => {

    if(taskToDelete) {

        const taskText = taskToDelete
            .querySelector("p")
            .textContent;

        taskToDelete.remove();

        tasks = tasks.filter(task => task.text !== taskText);

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    modal.classList.remove("active");

    taskToDelete = null;
});


// TACHAR TAREA REALIZADA
document.addEventListener("click", (e) => {

    if(
        e.target.classList.contains("ri-checkbox-blank-circle-line") ||
        e.target.classList.contains("ri-checkbox-circle-fill")
    ) {

        const taskItem = e.target.parentElement.parentElement;

        const taskText = taskItem
            .querySelector("p")
            .textContent;

        const task = tasks.find(task => task.text === taskText);

        task.completed = !task.completed;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        e.target.classList.toggle("ri-checkbox-blank-circle-line");
        e.target.classList.toggle("ri-checkbox-circle-fill");

        taskItem.classList.toggle("completed-task");
    }
});
