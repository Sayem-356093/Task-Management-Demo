let taskList = document.querySelector(".all-task-wrapper");
let popUpButton = document.querySelector(".popup-button");
let addTaskButton = document.getElementById("add-task");
let progressArray = [];

taskList.addEventListener("click", (e) => {
  let toggleButton = document.querySelectorAll(".task-toggle");
  let taskInfoBlock = document.querySelectorAll(".task-info-block");
  let deleteButton = document.querySelectorAll(".delete");
  let editButton = document.querySelectorAll(".edit");
  let taskName = document.querySelectorAll(".task-name");
  let taskInfo = document.querySelectorAll(".task-info");
  let dueDate = document.querySelectorAll(".due-date");
  let checkBox = document.querySelectorAll(".progress");
  
  let editTaskName = document.getElementsByName("edit-task-name");
  let editTaskInfo = document.getElementsByName(
    "edit-task-info"
  );
  let editDueDate = document.getElementsByName("edit-due-date");
  let editPopUp = document.querySelectorAll(".edit-task-popup");
  let updateButton = document.querySelectorAll(".update-task")

  toggleButton.forEach((value, index) => {
    if (e.target.closest(".task-toggle") == toggleButton[index]) {
      taskInfoBlock[index].classList.toggle("active");
    }
    if (e.target.closest(".delete") == deleteButton[index]) {
      e.target.closest(".task-item").remove();
      if(checkBox[index].checked == true){
        progressArray.pop();
      }
      if(taskList.childElementCount==1){
        document.querySelector(".intro").style.display = "block";
      }
      else{
        document.querySelector(".intro").style.display = "none";
      }
      progressWidth(progressArray.length);
      showRemainingTask();
      showTotalTask();
      showCompletedTask();
      showDelayedTasks();

    }
    if (e.target.closest(".edit") == editButton[index]) {
      editPopUp[index].classList.add("active");


      editTaskName[index].value = taskName[index].innerText;
      editTaskInfo[index].value = taskInfo[index].innerText;
      editDueDate[index].value = dueDate[index].innerText;

      editTaskName[index].addEventListener("change", () => {
        taskName[index].innerText = editTaskName[index].value;
      });

      editTaskInfo[index].addEventListener("change", () => {
        taskInfo[index].innerText = editTaskInfo[index].value;
      });

      editDueDate[index].addEventListener("change", () => {
        dueDate[index].innerText = editDueDate[index].value;
        showAlert();
        showDelayedTasks();
      });

      updateButton[index].addEventListener("click", () => {
        editPopUp[index].classList.remove("active");
        
      });
    }
    if (e.target.closest(".progress") == checkBox[index]) {
      if (checkBox[index].checked == true) {
        taskName[index].classList.add("complete");
        progressArray.push(true);
      } else {
        taskName[index].classList.remove("complete");
        progressArray.pop();
      }

      progressWidth(progressArray.length);
      showRemainingTask();
      showTotalTask();
      showCompletedTask();
      showDelayedTasks();
    }
  });
});

popUpButton.addEventListener("click", (e) => {
  if (e.target.closest(".popup-button") == popUpButton) {
    showPopUp();
  }
});

function showPopUp() {
  document.querySelector(".add-task-popup").classList.toggle("active");
}

addTaskButton.addEventListener("click", addNewTask);

function addNewTask() {
  let taskName = document.querySelector("input[name = task-name]");
  let taskInfo = document.querySelector("textarea[name = task-info]");
  let taskDueDate = document.querySelector("input[name = due-date]");
  let taskItem = `<div class="task-item">
            <div class="task-header">
              <h3 class="task-name">${taskName.value}</h3>
              <div class="task-options">
              <p class="due-date">${taskDueDate.value}</p>
              <div class="task-button-wrapper">
                <input type="checkbox" name="task-complete" class="progress">
                <button class="edit">Edit</button>
                <button class="delete">x</button>
                <button class="task-toggle">+</button>
              </div>
            </div>
            </div>
            <div class="task-info-block">
              <p class="task-info">
                ${taskInfo.value}
              </p>
            </div>
            <div class="edit-task-popup">
            <div class="edit-task-form">
              <input
                type="text"
                name="edit-task-name"
                placeholder="Edit task name"
              />
              <input type="datetime-local" name="edit-due-date" />
              <textarea
                name="edit-task-info"
                placeholder="Edit task info"
              ></textarea>
              <button class="update-task">Update Task</button>
            </div>
          </div>
          </div>`;
  taskList.insertAdjacentHTML("beforeend", taskItem);
  showPopUp();
  showAlert();
  progressWidth(progressArray.length);
  document.querySelector(".intro").style.display = "none";
  showRemainingTask();
  showTotalTask();
  showCompletedTask();
  showDelayedTasks();

  
}

function showAlert() {
  let dueDateAlert = document.querySelectorAll(".due-date");

  dueDateAlert.forEach((value, index) => {
    if (Date.now() > Date.parse(dueDateAlert[index].innerText)) {
      dueDateAlert[index].classList.add("red");
    } else {
      dueDateAlert[index].classList.remove("red");
    }
  });
}

function progressWidth(numb){
  let width;
  let progressText = document.querySelector(".progress-bar-text")
  if(taskList.childElementCount == 1){
    width = 0;
  }
  else{
    width = ((100 / (taskList.childElementCount-1)) * numb).toFixed(2);
  }

  if(progressText.innerText == ""){
    progressText.innerText = `${width}%`
  }
  else{
    progressText.innerText = ""
    progressText.innerText = `${width}%`
  }
    
  document.querySelector(".progress-inner").style.width = `${width}%`;
}

function remainingTask(){
  let c = Array.from(document.querySelectorAll(".progress"));

  let d = c.filter((value, index)=>{

    return (value.checked == false);
})

return d.length;

}

function showTotalTask(){
  let totalTasks = document.getElementById("total-tasks");
  if(totalTasks.innerText == ""){
    totalTasks.innerText = `${taskList.childElementCount-1}`;
  }

  else{
    totalTasks.innerText = "";
    totalTasks.innerText = `${taskList.childElementCount-1}`;
  }
}

function showCompletedTask(){
  let completedTasks = document.getElementById("completed-tasks");
  if(completedTasks.innerText == ""){
    completedTasks.innerText = `${progressArray.length}`;
  }

  else{
    completedTasks.innerText = "";
    completedTasks.innerText = `${progressArray.length}`;
  }
}

function showRemainingTask (){
  let remainingTaskText = document.getElementById("remaining-tasks");
  if(remainingTaskText.innerText == ""){
    remainingTaskText.innerText = `${remainingTask()}`
  }
  else{
    remainingTaskText.innerText =""
    remainingTaskText.innerText = `${remainingTask()}`

  }
}

function showDelayedTasks(){
  let delayedTasks = Array.from(document.querySelectorAll(".progress"));
  let delayedTime = Array.from(document.querySelectorAll(".due-date"));
  
 let delayArray =  delayedTime.filter((value, index)=>{
    if(delayedTime[index].classList.contains("red") && delayedTasks[index].checked == false){
      return delayedTime[index];
    }
  })

  let delayedTaskText = document.getElementById("delayed-task");
  if(delayedTaskText.innerText == ""){
    delayedTaskText.innerText = `${delayArray.length}`
  }
  else{
    delayedTaskText.innerText =""
    delayedTaskText.innerText = `${delayArray.length}`

  }

}


