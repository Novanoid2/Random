let backColor = "white";
let textColor = "black";
let themeButton, buttonCreate, buttonDelete, currentTask, maxTasks, currentTaskDelete;
let backGroundColor = 0;
let counter = 1;
var taskList = [];
//var buttonList = [];
//var standByButtonList = [];

function setup() {
  maxTasks = Math.trunc((windowHeight - 145) / 37);
  createCanvas(windowWidth, windowHeight);
  themeButton = createButton("Change theme");
  buttonCreate = createButton("Create new task");
  buttonDelete = createButton("Delete a task");
  themeButton.position(windowWidth - 100, 0);
  buttonCreate.position(windowWidth / 2 - 95, 60);
  buttonDelete.position(windowWidth / 2 + 15, 60);
}

function draw() {
  background(backColor);
  themeButton.mousePressed(mainColor);
  buttonCreate.mousePressed(createTask);
  buttonDelete.mousePressed(deleteTaskprompt);
  fill(textColor);
  textSize(50);
  text("To-Do list", windowWidth / 2 - 100, 50);
  if (currentTask !== undefined) {
    showText();
  }
}

function mainColor() {
  if (backGroundColor === 1) {
    backColor = "black";
    textColor = "white";
    backGroundColor = 0;
  } else {
    backColor = "white";
    textColor = "black";
    backGroundColor = 1;
  }
}
function createTask() {
  taskPrompt();
  if (currentTask !== null && currentTask !== " " && currentTask !== undefined && currentTask !== "") {
    if (taskList.length < maxTasks) {
      taskList.push(currentTask);
/*     standByButtonList[counter] = createButton("X");
       standByButtonList[counter].position(
        windowWidth / 2 - 285,
        126 + 37 * (counter - 1)
      );
      standByButtonList[counter].mousePressed(deleteTaskver2);
      buttonList.push(standByButtonList[counter]);*/
      counter++;
    }
  }
}
function showText() {
  fill(textColor);
  textSize(25);
  for (let i = 0; i < taskList.length; i++) {
    text("> " + taskList[i], windowWidth / 2 - 250, 145 + 37 * i);
  }
  for (let j = 0; j < maxTasks; j++) {}
}
function deleteTaskprompt() {
  taskPromptDelete();
}

function deleteTask() {
  if (currentTaskDelete !== undefined && Number.isNaN(currentTaskDelete) === false && currentTaskDelete > -1) {
    taskList.splice(currentTaskDelete, 1);
    counter--;
  }
}
/*function deleteTaskver2() {
  taskList.splice(0, 1);
  buttonList.splice(0, 1);
 // standByButtonList[counter].position =(-100,-100);
  counter--;
}
*/