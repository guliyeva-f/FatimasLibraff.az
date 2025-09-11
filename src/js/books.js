import categPopUp from "./components/categPopUp.js";
import getAllBooks from "./services/getAllBooks.js";
import getAllCategs from "./services/getAllCategs.js";
import bookCardTemplate from "./components/cardTemplate.js";
import navYolu from "./components/navYolu.js";

window.categPopUp = categPopUp;
const mainSec = document.getElementById("mainSec");

const params = new URLSearchParams(window.location.search);
const categ = params.get("categ");
const category = params.get("category");
const alt = params.get("alt");

mainSec.innerHTML = `<div class="flex justify-center items-center py-20 w-full">
    <div class="loaderr"></div></div>`;

async function initPage() {
  try {
    const delay = new Promise(resolve => setTimeout(resolve, 500));
    const [books, categs] = await Promise.all([getAllBooks(), getAllCategs(), delay]);

    mainSec.innerHTML = `
      <div class="px-[20px]">
        <hr class="text-gray-300">
        <div class="px-[10px]" id="catBooksHead"></div>
      </div>
      <section class="px-[20px] mt-8 flex gap-5">
        <aside class="w-[300px] border rounded-2xl shrink-0 border-gray-300 p-[15px_10px]">
          <h3 class="font-bold">Kateqoriyalar</h3>
          <ul id="categList"></ul>
        </aside>
        <div class="flex flex-col gap-8 w-full">
          <div id="result"></div>
        </div>
      </section>
    `;

    const result = document.getElementById("result");
    const catBooksHead = document.getElementById("catBooksHead");
    const categList = document.getElementById("categList");

    renderHeader(catBooksHead);
    renderBooks(books, result);
    categList.innerHTML = generateListHTML(categs, books, categ, category, alt);

  } catch (err) {
    console.error(err);
    mainSec.innerHTML = `<p class="text-red-500 text-center py-10">Xəta baş verdi (console bax)</p>`;
  }
}

function renderHeader(catBooksHead) {
  catBooksHead.innerHTML = `
    <h1 class="text-[#0f172a] text-[28px] font-bold mt-4">
      ${alt || category || categ}</h1>
    <ul class="flex items-center text-[#555] gap-2 mt-1">
      ${navYolu(categ, category, alt)}
    </ul>
  `;
}

function renderBooks(bookList, result) {
  const filtered = bookList.filter((book) => {
    const matchCateg = !category || book.category?.toLowerCase() === category.toLowerCase();
    const matchAlt = !alt || book.altCategory?.toLowerCase() === alt.toLowerCase();
    return categ === "Kitab" && matchCateg && matchAlt;
  });
  result.innerHTML = `<div class="container m-auto grid grid-cols-4 gap-3">
  ${filtered.map(bookCardTemplate).join("")}</div>`;

  if (!filtered.length) {
    result.innerHTML = `
      <div class="flex justify-center w-full">
        <p class="text-gray-500 text-[16px] mt-5">
          Bu kateqoriyada məhsul mövcud deyil.
        </p></div>`;
  }
}

function generateListHTML(categData, bookData, filterCateg, filterCategory, filterAlt) {
  return `
    <ul class="p-[25px_5px] flex flex-col">
      ${categData
      .map((item) => {
        const isSelected = filterCateg?.toLowerCase() === item.title.toLowerCase();
        const hasBooks = bookData.some(
          (book) => book.category?.toLowerCase() === item.title.toLowerCase()
        );

        return `
            <li class="relative font-bold mt-2">
              <a href="?categ=${encodeURIComponent(item.title)}"
                 class="cursor-pointer ${isSelected ? "text-[#0f172a]" : "text-[#0f172abf] hover:text-[#ef3340]"} pl-2 relative">
                ${isSelected
            ? '<span class="absolute left-0 top-0 w-[3px] h-full bg-[#ef3340] rounded-md"></span>'
            : ""
          }
                ${item.title}${hasBooks ? " +" : ""}
              </a>
              ${isSelected ? renderCategoryList(item, filterCategory, filterAlt, bookData) : ""}
            </li>`;
      })
      .join("")}
    </ul>
  `;
}

function renderCategoryList(item, filterCategory, filterAlt, bookData) {
  return `
    <ul class="pl-4 my-2.5 flex flex-col">
      ${item.categories
      .map((cat) => {
        const isSelected = filterCategory?.toLowerCase() === cat.title.toLowerCase();
        const hasBooks = bookData.some(
          (book) => book.category?.toLowerCase() === cat.title.toLowerCase()
        );

        return `
            <li class="relative mt-2">
              <a href="?categ=${encodeURIComponent(item.title)}&category=${encodeURIComponent(
          cat.title
        )}"
                 class="flex items-center gap-2 ${isSelected ? "font-semibold text-[#0f172a]" : "text-[#0f172abf] hover:text-[#ef3340]"} pl-3 relative">
                ${isSelected
            ? `<span class="absolute left-0 top-0 w-[3px] h-full bg-[#ef3340] rounded-md"></span>`
            : ""
          }
                ${cat.title}
                ${hasBooks ? '<i class="fa-solid fa-circle text-[#08CB00] text-[6px]"></i>' : ""}
              </a>
              ${isSelected && cat.altCateg?.length ? renderAltCategoryList(cat, item, filterAlt, bookData) : ""}
            </li>`;
      })
      .join("")}
    </ul>
  `;
}

function renderAltCategoryList(cat, item, filterAlt, bookData) {
  return `
    <ul class="pl-4 mt-2.5 flex flex-col">
      ${cat.altCateg
      .map((altName) => {
        const isSelected = filterAlt?.toLowerCase() === altName.toLowerCase();
        const hasBooks = bookData.some(
          (book) =>
            book.category?.toLowerCase() === cat.title.toLowerCase() &&
            book.altCategory?.toLowerCase() === altName.toLowerCase()
        );

        return `
            <li class="relative mt-2">
              <a href="?categ=${encodeURIComponent(item.title)}&category=${encodeURIComponent(
          cat.title
        )}&alt=${encodeURIComponent(altName)}"
                 class="flex items-center gap-2 ${isSelected ? "font-semibold text-[#0f172a]" : "text-[#0f172abf] hover:text-[#ef3340]"} pl-3 relative">
                ${isSelected
            ? `<span class="absolute left-0 top-0 w-[3px] h-full bg-[#ef3340] rounded-md"></span>`
            : ""
          }
                ${altName}
                ${hasBooks ? '<i class="fa-solid fa-circle text-[#E62727] text-[6px]"></i>' : ""}
              </a>
            </li>`;
      })
      .join("")}
    </ul>
  `;
}

initPage();
