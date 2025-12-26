// =========================
// App Global Script
// =========================

// 等 DOM 載入完成
document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setPageTitle();
});

// =========================
// 底部導覽 active 狀態
// =========================
function setActiveNav() {
  const links = document.querySelectorAll(".bottom-nav a");
  const currentPage = location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

// =========================
// 自動設定 Header 標題
// =========================
function setPageTitle() {
  const pageTitle = document.querySelector("header[data-title]");
  if (!pageTitle) return;

  const title = pageTitle.getAttribute("data-title");
  pageTitle.textContent = title;
}

// =========================
// 共用工具（之後可擴充）
// =========================

// 清空 LocalStorage（測試用）
function clearAllData() {
  if (confirm("確定要清除所有資料嗎？")) {
    localStorage.clear();
    location.reload();
  }
}
