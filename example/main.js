import { Palette } from "../lib/index.esm.js";

const palette = new Palette({ el: "#container" });
palette.init();


document.getElementById("close-btn").addEventListener("click", () => {
  palette.clean();
});


document.getElementById("render-btn").addEventListener("click", () => {
  palette.savePicture('myImg');
});