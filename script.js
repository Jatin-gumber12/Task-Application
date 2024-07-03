document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("new-task-form");
    const tasksList = document.getElementById("tasks");
  
    let tasks = [];
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const dueDate = document.getElementById("due-date").value;
  
      const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
      };
  
      tasks.push(newTask);
      renderTasks();
  
      form.reset();
    });
  
    function renderTasks() {
      tasksList.innerHTML = "";
      tasks.forEach((task) => {
        const li = document.createElement("li");
  
        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";
  
        const title = document.createElement("h3");
        title.textContent = task.title;
        taskInfo.appendChild(title);
  
        const description = document.createElement("p");
        description.textContent = task.description;
        taskInfo.appendChild(description);
  
        const dueDate = document.createElement("p");
        dueDate.textContent = `Due: ${task.dueDate}`;
        taskInfo.appendChild(dueDate);
  
        li.appendChild(taskInfo);
  
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.onclick = function () {
          editTask(task.id);
        };
        li.appendChild(editButton);
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = function () {
          deleteTask(task.id);
        };
        li.appendChild(deleteButton);
  
        tasksList.appendChild(li);
      });
    }
  
    function editTask(taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description;
        document.getElementById("due-date").value = task.dueDate;
  
        tasks = tasks.filter((t) => t.id !== taskId);
        renderTasks();
      }
    }
  
    function deleteTask(taskId) {
      tasks = tasks.filter((t) => t.id !== taskId);
      renderTasks();
    }
  });