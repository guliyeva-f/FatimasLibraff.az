import categPopUp from "./components/categPopUp.js";
import getAllBooks from "./services/getAllBooks.js";
import bookCardTemplate from "./components/cardTemplate.js";
import { addFavorite, removeFavorite, isFavorite } from "./utils/favoriteUtils.js";

window.categPopUp = categPopUp;
const mainSec = document.getElementById("mainSec");

async function initPage() {
    try {
        const delay = new Promise(resolve => setTimeout(resolve, 500));
        const [books] = await Promise.all([getAllBooks(), delay]);

        let html = `<div class="px-[20px]">
        <hr class="text-gray-300">
        <div class="px-[10px]" id="catBooksHead"></div>
      </div>`;

        const favoriteBooks = books.filter(book => isFavorite(book.id));

        if (favoriteBooks.length > 0) {
            html += `<section class="px-[30px] mt-8 grid grid-cols-6 gap-10"> 
        ${favoriteBooks.map(bookCardTemplate).join("")}
        </section>`;
        }
        else {
            html += `<p class="text-center text-gray-500 py-10">Seçilmişlərdə kitab yoxdur</p>`;
        }

        mainSec.innerHTML = html;
        const catBooksHead = document.getElementById("catBooksHead");
        renderHeader(catBooksHead);
    }
    catch (err) {
        console.error(err);
        mainSec.innerHTML = `<p class="text-red-500 text-center py-10">Xəta baş verdi (console bax)</p>`;
    }
}

function renderHeader(catBooksHead) {
    catBooksHead.innerHTML = `
      <h1 class="text-[#0f172a] text-[28px] font-bold mt-4">Seçilmişlər</h1>
      <ul class="flex items-center text-[#555] gap-2 mt-1">
        <li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="../../index.html">Əsas səhifə</a></li><span> / </span>
        <li class="text-[#0f172a]">Seçilmişlər</li>
      </ul>
    `;
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

initPage();
