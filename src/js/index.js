import getAllBooks from "./services/getAllBooks.js";
import swiper from "./components/swiper.js";
import categPopUp from "./components/categPopUp.js";
import bookCardTemplate from "./components/cardTemplate.js";
import { addFavorite, removeFavorite, isFavorite } from "./utils/favoriteUtils.js";

window.categPopUp = categPopUp;

const booksContainer = document.getElementById("booksContainer");

const loader = `
  <div class="flex justify-center my-8">
    <div class="🤚">
      <div class="👉"></div>
      <div class="👉"></div>
      <div class="👉"></div>
      <div class="👉"></div>
      <div class="🌴"></div>		
      <div class="👍"></div>
    </div>
  </div>`;

const loader2 = `<span class="loader"></span>`;

function renderSkeletons(count = 12) {
  return Array(count).fill(loader2).join("");
}

async function renderBooks() {
  try {
    booksContainer.innerHTML = `${loader}
      <div id="books" class="grid grid-cols-6 gap-3 mt-12">
        ${renderSkeletons(12)}
      </div>`;

    const delay = new Promise(resolve => setTimeout(resolve, 1000));
    const [books] = await Promise.all([getAllBooks(), delay]);

    booksContainer.innerHTML = `
      <h1 class="text-[#0f172a] font-medium text-3xl">Bugünün seçimləri</h1>
      <div id="books" class="grid grid-cols-6 gap-3 mt-5">
        ${books.map(bookCardTemplate).join("")}
      </div>
    `;
  }
  catch (error) {
    booksContainer.innerHTML = `
      <p class="text-center text-red-500 my-10 font-bold">
        Kitabları yükləmək mümkün olmadı (console bax)</p>`;
    console.log(error);
  }
}
window.toggleFavorite = function (btn) {
  const id = btn.getAttribute("data-id");
  if (isFavorite(id)) {
    removeFavorite(id);
    btn.classList.remove("active");
  } else {
    addFavorite(id);
    btn.classList.add("active");
  }
};

renderBooks();