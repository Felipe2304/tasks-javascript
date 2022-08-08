let tasks = [];

const createTask = (title, completed = false) => {
  // criar tarefa
  tasks.push({
    title: title,
    completed: completed,
  });
};

const readTasks = () => {
  return tasks;
};

const updateTask = (position, newTask) => {
  const newTasks = tasks.map((task, index) => {
    if (index === position) return newTask;
    return task;
  });

  tasks = newTasks;
};

const deleteTask = (position) => {
  const newTasks = tasks.filter((_task, index) => index !== position);
  tasks = newTasks;
};

const toggleTaskCompleted = (position) => {
  const newTasks = tasks.map((task, index) => {
    if (index === position) {
      return { title: task.title, completed: task.completed ? false : true };
    }

    return task;
  });

  tasks = newTasks;
};

const createElement = (tag, className, text) => {
  const $element = document.createElement(tag);
  $element.classList.add(className);

  if (text !== undefined) $element.textContent = text;

  return $element;
};

const Logo = () => {
  const $logo = createElement("div", "logo");
  const $tasks = createElement("h1", "logo-title", "Tasks");
  const $logoIcon = createElement("img", "logo-icon");
  $logoIcon.setAttribute("src", "./src/img/task-icon.svg");

  $logo.appendChild($logoIcon);
  $logo.appendChild($tasks);

  return $logo;
};

const AddTask = () => {
  const $container = createElement("div", "search");
  const $input = createElement("input", "search-input");
  $input.setAttribute("placeholder", "Digite uma tarefa");
  const $button = createElement("button", "search-button", "add");

  const handleAddTask = () => {
    if ($input.value.length > 0) createTask($input.value);
    mostrarTasksNaTela();
    mostrarProgressNaTela();

    $input.value = "";
    $input.focus();
  };
  $button.addEventListener("click", handleAddTask);
  $input.addEventListener(
    "keyup",
    (event) => event.code === "Enter" && handleAddTask()
  );

  $container.appendChild($input);
  $container.appendChild($button);

  return $container;
};

const HomeScreen = () => {
  const $container = createElement("div", "home-screen");
  const $image = createElement("img", "initial-image");
  $image.setAttribute("src", "./src/img/image_principal.svg");
  const $informativeText = createElement("p", "informative-text");
  $informativeText.textContent = "Não há tarefas cadastrada ainda";
  const $button = createElement(
    "button",
    "register-button",
    "Cadastrar tarefa"
  );

  const focusInput = () => {
    const $input = document.querySelector(".search-input");

    $input.focus();
  };

  $button.addEventListener("click", focusInput);

  $container.appendChild($image);
  $container.appendChild($informativeText);
  $container.appendChild($button);

  return $container;
};

const Title = (text) => {
  const $title = createElement("h2", "title", text);

  return $title;
};

const Task = (task, position) => {
  const $container = createElement("li", "task-item");
  const $deleteIcon = createElement("img", "task-item-delete");
  $deleteIcon.setAttribute("src", "./src/img/icon_delete.svg");
  const $title = createElement("p", "task-item-title", task.title);
  const $completedIcon = createElement("img", "task-item-completed");
  $completedIcon.setAttribute("src", "./src/img/icon_conclued.svg");

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteTask(position);
    mostrarTasksNaTela();
    mostrarProgressNaTela();
  };

  const handleToggle = () => {
    toggleTaskCompleted(position);
    mostrarTasksNaTela();
    mostrarProgressNaTela();
  };

  $deleteIcon.addEventListener("click", handleDelete);
  $container.addEventListener("click", handleToggle);
  $container.appendChild($deleteIcon);
  $container.appendChild($title);
  if (task.completed) $container.appendChild($completedIcon);

  return $container;
};

const mostrarTasksNaTela = () => {
  $taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const $task = Task(task, index);
    $taskList.appendChild($task);
  });
};

const mostrarProgressNaTela = () => {
  $progressContainer.innerHTML = "";

  if (readTasks().length > 0) {
    const $progressBar = ProgressBar();
    $progressContainer.appendChild($progressBar);
  } else {
    const $homeScreen = HomeScreen();
    $taskList.appendChild($homeScreen);
  }
};

const ProgressBar = () => {
  const totalTaks = readTasks().length;
  const totalTasksCompleted = readTasks().filter(
    (task) => task.completed
  ).length;

  console.log(readTasks());
  const $wrapper = createElement("div", "wrapper-progress");
  const $concluedWrapper = createElement("div", "wrapper-conclued");
  const $textConclued = createElement("span", "conclued-text", "Concluídas");
  const $quantitiTasks = createElement(
    "span",
    "quantiti-tasks",
    `${totalTasksCompleted} / ${totalTaks}`
  );
  const $bar = createElement("div", "bar");
  const $progress = createElement("div", "progress");

  $progress.style.width = `${(100 / totalTaks) * totalTasksCompleted}%`;
  $concluedWrapper.appendChild($textConclued);
  $concluedWrapper.appendChild($quantitiTasks);
  $bar.appendChild($progress);
  $wrapper.appendChild($concluedWrapper);
  $wrapper.appendChild($bar);

  return $wrapper;
};

const $root = document.querySelector("#root");
const $mainContainer = createElement("section", "main-container");
const $logo = Logo();
const $addTask = AddTask();
const $content = createElement("section", "content");
const $progressContainer = createElement("div", "progress-bar");

const $homeScreen = HomeScreen();

const $titleTasks = Title("Todas Tarefas");
const $taskList = createElement("ul", "task-list");

$mainContainer.appendChild($logo);
$mainContainer.appendChild($addTask);
$mainContainer.appendChild($content);
$content.appendChild($progressContainer);
$content.appendChild($titleTasks);
$content.appendChild($taskList);
$root.appendChild($mainContainer);

mostrarTasksNaTela();
mostrarProgressNaTela();
