import getAllBooks from "./services/getAllBooks.js";
import swiper from "./components/swiper.js";
import categPopUp from "./components/categPopUp.js";
import bookCardTemplate from "./components/cardTemplate.js"

window.categPopUp = categPopUp;

const container = document.getElementById('books');
const booksContainer = document.getElementById('booksContainer');

async function renderBooks() {
  try {
    const books = await getAllBooks();
    if (!books || books.length === 0) {
      booksContainer.innerHTML = `<p class="text-center text-gray-500 font-bold">Datada kitab tapılmadı</p>`;
      return;
    }
    container.innerHTML = books.map(bookCardTemplate).join('');
  }
  catch (error) {
    booksContainer.innerHTML = `<p class="text-center text-red-500 my-10 font-bold">Kitabları yükləmək mümkün olmadı: ${error}</p>`;
  }
}

renderBooks();