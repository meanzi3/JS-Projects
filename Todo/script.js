const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
  // 새로운 아이템 객체 생성
  const item = {
    id: new Date().getTime(),
    text: "",
    complete: false,
  };

  // 배열 처음에 새로운 아이템을 추가
  todos.unshift(item);

  // 요소 생성하기
  const { itemEl, inputEl, editBtn, removeBtn } = createTodoElement(item);

  // 리스트 요소 안에 방금 생성한 아이템 요소 추가
  list.prepend(itemEl);

  inputEl.removeAttribute("disabled");

  inputEl.focus();

  // localStorage에 저장
  saveToLocalStorage();
}

// 요소 생성 함수
function createTodoElement(item) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  const checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  checkBoxEl.checked = item.complete;

  if (item.complete) {
    itemEl.classList.add("complete");
  }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");

  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtn = document.createElement("button");
  editBtn.classList.add("meterial-icons");
  editBtn.innerText = "edit";

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("meterial-icons", "remove-btn");
  removeBtn.innerText = "remove_circle";

  // 체크박스 클릭 이벤트
  checkBoxEl.addEventListener("change", () => {
    item.complete = checkBoxEl.checked;
    if (item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }
    // 저장
    saveToLocalStorage();
  });

  // input blur 이벤트
  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");
    // 저장
    saveToLocalStorage();
  });

  // input 입력 이벤트
  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;
  });

  // edit 버튼 클릭 이벤트
  editBtn.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });

  // remove 버튼 클릭 이벤트
  removeBtn.addEventListener("click", () => {
    // 해당하는 요소의 id와 다른 id의 todo들만 filtering 해서 todos 배열에 새로 저장
    todos = todos.filter((todo) => todo.id !== item.id);
    // 실제 요소도 삭제
    itemEl.remove();
    // 저장
    saveToLocalStorage();
  });

  actionsEl.append(editBtn);
  actionsEl.append(removeBtn);

  itemEl.append(checkBoxEl);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  return { itemEl, inputEl, editBtn, removeBtn };
}

// LocalStorage에 저장 함수
function saveToLocalStorage() {
  const data = JSON.stringify(todos);

  // my_todos에 data(JSON String) 저장
  window.localStorage.setItem("my_todos", data);
}

// LocalStorage에 저장된 데이터 가져오기 함수
function loadFromLocalStorage() {
  const data = localStorage.getItem("my_todos");

  // todos 배열에 저장
  if (data) {
    todos = JSON.parse(data); // JSON String to object
  }
}

// LocalStorage에 저장된 데이터들을 화면에 보여주는 함수
function displayTodos() {
  // 가져온 todos 배열의 각 요소들을 createTodoElement를 이용해 요소들을 생성하고 list요소에 추가 (화면에 보여주기)
  loadFromLocalStorage();
  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];
    const { itemEl } = createTodoElement(item);
    list.append(itemEl);
  }
}

displayTodos();
