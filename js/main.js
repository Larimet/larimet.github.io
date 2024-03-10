const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. если пользователь первый раз зашел
// проверка темной темы на уровне системных настроек
// есть ли в браузере window match media:
// если да то проверяем медиа запрос, включена ли темная тема:
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  btnDarkMode.classList.add("dark-mode-btn--active");
  document.body.classList.add("dark");
}

// 2. проверка темной темы в localStorage
if (localStorage.getItem("darkMode") === "dark") {
  // добавляем активный класс
  btnDarkMode.classList.add("dark-mode-btn--active");
  // к body тоже
  document.body.classList.add("dark");
} // хотя по умолчанию всегда light, то что снизу необязательно
else if (localStorage.getItem("darkMode") === "light") {
  btnDarkMode.classList.remove("dark-mode-btn--active");
  document.body.classList.remove("dark");
}

// если меняются системные настройки, меняем тему (т.е. автоматическая смена)
// прослушка события change
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    // если тема изменилась и соотв. темной, то вернем dark
    // если тема изменилась и НЕ соотв. темной, то вернем light
    const newColorScheme = event.matches ? "dark" : "light";

    if (newColorScheme === "dark") {
      btnDarkMode.classList.add("dark-mode-btn--active");
      document.body.classList.add("dark");
      // запись в localStorage изменений системных (?)
      localStorage.setItem("darkMode", "dark");
    } else {
      btnDarkMode.classList.remove("dark-mode-btn--active");
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "light");
    }
  });

// включение ночного режима по кнопке
btnDarkMode.onclick = function () {
  btnDarkMode.classList.toggle("dark-mode-btn--active");
  const isDark = document.body.classList.toggle("dark");

  if (isDark) {
    localStorage.setItem("darkMode", "dark"); // ключ darkmode и значение dark
  } else {
    localStorage.setItem("darkMode", "light");
  }
};
