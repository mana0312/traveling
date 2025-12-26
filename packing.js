// =========================
// Packing List App
// =========================

const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("packingList");

let items = JSON.parse(localStorage.getItem("packingItems")) || [];

// 初始化
renderList();

// 新增物品
addBtn.addEventListener("click", addItem);

// Enter 也可新增（手機外接鍵盤友善）
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

function addItem() {
  const text = input.value.trim();
  if (text === "") return;

  items.push({
    name: text,
    checked: false
  });

  input.value = "";
  saveData();
  renderList();
}

// 刪除物品
function deleteItem(index) {
  items.splice(index, 1);
  saveData();
  renderList();
}

// 勾選完成
function toggleItem(index) {
  items[index].checked = !items[index].checked;
  saveData();
  renderList();
}

// 儲存到 LocalStorage
function saveData() {
  localStorage.setItem("packingItems", JSON.stringify(items));
}

// 渲染清單
function renderList() {
  list.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");

    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "8px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;
    checkbox.addEventListener("change", () => toggleItem(index));

    const span = document.createElement("span");
    span.textContent = item.name;
    if (item.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "#999";
    }

    left.appendChild(checkbox);
    left.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "刪除";
    delBtn.style.width = "auto";
    delBtn.style.padding = "6px 10px";
    delBtn.style.background = "#f44336";
    delBtn.style.fontSize = "14px";
    delBtn.addEventListener("click", () => deleteItem(index));

    li.appendChild(left);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}
