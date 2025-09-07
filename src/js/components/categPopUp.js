import { initBooks, renderMainCategories } from "./categRenderer.js";

// bu js fayli category modalinin achilib baglanmasini edir
const overlay = document.getElementById("overlayPopUp");
let isDataLoaded = false;

export default async function categPopUp(isOpen) {
    overlay.classList.toggle("hidden", !isOpen);
    if (!isOpen) return;

    if (!isDataLoaded) {
        await initBooks();
        await renderMainCategories();
        isDataLoaded = true;
    }
    else renderMainCategories();
}

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) categPopUp(false);
});