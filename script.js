const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("themeToggle");

let input = "";
let resultShown = false;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;

    if (value === "C") {
      input = "";
      display.textContent = "0";
      return;
    }

    if (value === "=") {
      try {
        const result = eval(input);
        if (!isFinite(result)) throw "Math Error";
        display.textContent = result;
        input = result.toString();
        resultShown = true;
      } catch {
        display.textContent = "Error";
        input = "";
      }
      return;
    }

    if (resultShown && !["+", "-", "*", "/"].includes(value)) {
      input = "";
      resultShown = false;
    }

    // Avoid duplicate operators
    if (
      ["+", "-", "*", "/"].includes(value) &&
      ["+", "-", "*", "/"].includes(input.slice(-1))
    ) {
      return;
    }

    // Prevent multiple dots
    if (value === "." && /\.\d*$/.test(input)) {
      return;
    }

    input += value;
    display.textContent = input;
  });
});

// Keyboard input support
document.addEventListener("keydown", (e) => {
  const allowed = "0123456789+-*/.=cC";
  if (!allowed.includes(e.key)) return;

  const key = e.key === "c" || e.key === "C" ? "C" : e.key;
  const btn = [...buttons].find(b => b.dataset.value === key);
  if (btn) btn.click();
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
