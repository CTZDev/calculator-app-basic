const d = document;

export default function toggle() {
  const $toggle = d.getElementById("toggle");
  const $toggleButton = d.getElementById("toggleButton");
  const $themes = d.querySelectorAll(".navigation-theme-values > span");

  d.addEventListener("click", (e) => {
    if (e.target === $toggle) {
      let widthToggle = $toggle.clientWidth;
      let toggleSplit = widthToggle / $themes.length;
      let x = e.offsetX;

      if (x >= 0 && x < toggleSplit) {
        $toggleButton.classList.remove("theme2");
        $toggleButton.classList.remove("theme3");
        d.body.classList.remove("active-theme2");
        d.body.classList.remove("active-theme3");
      } else if (x >= toggleSplit && x < toggleSplit * 2) {
        $toggleButton.classList.add("theme2");
        $toggleButton.classList.remove("theme3");
        d.body.classList.add("active-theme2");
        d.body.classList.remove("active-theme3");
      } else {
        $toggleButton.classList.remove("theme2");
        $toggleButton.classList.add("theme3");
        d.body.classList.remove("active-theme2");
        d.body.classList.add("active-theme3");
      }
    }
  });
}
