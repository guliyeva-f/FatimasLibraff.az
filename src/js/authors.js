import categPopUp from "./components/categPopUp.js";
import getAllBooks from "./services/getAllBooks.js";
import bookCardTemplate from "./components/cardTemplate.js";
import { addFavorite, removeFavorite, isFavorite } from "./utils/favoriteUtils.js";

window.categPopUp = categPopUp;

const mainSec = document.getElementById("mainSec");
mainSec.innerHTML = `<div class="flex justify-center items-center py-20 w-full">
    <div class="loaderr"></div></div>`;

const azLetters = [
    "A", "B", "C", "Ç", "D", "E", "Ə", "F", "G", "Ğ", "H",
    "X", "I", "İ", "J", "K", "Q", "L", "M", "N", "O", "Ö",
    "P", "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"
];

function getUniqueAuthors(books, letter) {
    return Array.from(new Set(
        books.map(b => b.author)
            .filter(a => a && a.toUpperCase().startsWith(letter))
    ));
}

async function initPage() {
    try {
        const delay = new Promise(resolve => setTimeout(resolve, 500));
        const [books] = await Promise.all([getAllBooks(), delay]);

        const params = new URLSearchParams(window.location.search);
        const author = params.get("author");

        let html = `<div class="px-[20px]">
        <hr class="text-gray-300">
        <div class="px-[10px]" id="catBooksHead"></div>
      </div>`;

        if (author) {
            const authorBooks = books.filter(book => book.author === author);
            html += `<section class="px-[30px] mt-8 grid grid-cols-6 gap-10">
        ${authorBooks.map(book => bookCardTemplate(book)).join("")}
      </section>`;
        } else {
            html += `<section class="px-[30px] grid grid-cols-5 mt-8 gap-10">`;
            azLetters.forEach(letter => {
                const authors = getUniqueAuthors(books, letter);
                if (authors.length > 0) {
                    html += `<div class="p-5 border-b border-gray-300 flex flex-col items-center gap-5">
            <h2 class="text-[#0f172a] border-b border-gray-500 text-[20px] font-bold">${letter}</h2>
            <div class="flex flex-col items-center gap-2">
              ${authors.map(a => `
                <a href="muellifler.html?author=${encodeURIComponent(a)}"
                   class="text-[#ef3340] relative transition-colors duration-300 hover:text-[#ef3340] 
                          after:content-[''] after:absolute after:left-1/2 after:-bottom-1 
                          after:w-0 after:h-[1px] after:bg-[#ef3340] after:transition-all 
                          after:duration-300 after:-translate-x-1/2 hover:after:w-full">${a}</a>`).join("")}</div></div>`;
                }
            });

            html += `</section>`;
        }

        mainSec.innerHTML = html;

        const catBooksHead = document.getElementById("catBooksHead");
        renderHeader(catBooksHead, author);
    }
    catch (err) {
        console.error(err);
        mainSec.innerHTML = `<p class="text-red-500 text-center py-10">Xəta baş verdi (console bax)</p>`;
    }
}

function renderHeader(catBooksHead, author) {
    if (author) {
        catBooksHead.innerHTML = `
      <h1 class="text-[#0f172a] text-[28px] font-bold mt-4">${author}</h1>
      <ul class="flex items-center text-[#555] gap-2 mt-1">
        <li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="../../index.html">Əsas səhifə</a></li><span> / </span>
        <li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="/src/pages/muellifler.html">Müəlliflər</a></li><span> / </span>
        <li class="text-[#0f172a]">${author}</li>
      </ul>
    `;
    } else {
        catBooksHead.innerHTML = `
      <h1 class="text-[#0f172a] text-[28px] font-bold mt-4">Müəlliflər</h1>
      <ul class="flex items-center text-[#555] gap-2 mt-1">
        <li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="../../index.html">Əsas səhifə</a></li><span> / </span>
        <li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="/src/pages/muellifler.html">Müəlliflər</a></li>
      </ul>
    `;
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

initPage();