// =========================
// Itinerary Planner App
// =========================

const timeInput = document.getElementById("timeInput");
const titleInput = document.getElementById("titleInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("itineraryList");

let itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];

// 初始化
renderList();

// 新增行程
addBtn.addEventListener("click", addItinerary);

function addItinerary() {
  const time = timeInput.value;
  const title = titleInput.value.trim();

  if (time === "" || title === "") return;

  itineraries.push({
    time: time,
    title: title
  });

  timeInput.value = "";
  titleInput.value = "";

  saveData();
  renderList();
}

// 刪除行程
function deleteItinerary(index) {
  itineraries.splice(index, 1);
  saveData();
  renderList();
}

// 儲存資料
function saveData() {
  localStorage.setItem("itineraries", JSON.stringify(itineraries));
}

// 顯示清單
function renderList() {
  list.innerHTML = "";

  itineraries.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "card";

    const time = document.createElement("div");
    time.style.fontWeight = "bold";
    time.textContent = item.time;

    const title = document.createElement("div");
    title.textContent = item.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "刪除";
    delBtn.style.background = "#f44336";
    delBtn.style.marginTop = "8px";
    delBtn.style.fontSize = "14px";
    delBtn.addEventListener("click", () => deleteItinerary(index));

    li.appendChild(time);
    li.appendChild(title);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}
