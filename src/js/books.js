import categPopUp from "./components/categPopUp.js";
import getAllBooks from "./services/getAllBooks.js";
import getAllCategs from "./services/getAllCategs.js";
import bookCardTemplate from "./components/cardTemplate.js";
import navYolu from "./components/navYolu.js";

window.categPopUp = categPopUp;

// sorgu atib kitablari ve categleri getiririk
const [books, categs] = await Promise.all([getAllBooks(), getAllCategs()]);

// url de olan querylery tuturuq
const params = new URLSearchParams(window.location.search);
const categ = params.get("categ");
const category = params.get("category");
const alt = params.get("alt");

const categBooks = document.getElementById("categBooks");
const result = document.getElementById("result");
const catBooksHead = document.getElementById("catBooksHead");
const categList = document.getElementById("categList");

function renderHeader() {
  catBooksHead.innerHTML = `
    <h1 class="text-[#0f172a] text-[28px] font-bold mt-4">
      ${alt || category || categ}</h1>
    <ul class="flex items-center text-[#555] gap-2 mt-1">
      ${navYolu(categ, category, alt)}
    </ul>
  `;
}

function renderBooks(bookList) {
  const filtered = bookList.filter((book) => {
    const matchCateg = !category || book.category?.toLowerCase() === category.toLowerCase();
    const matchAlt = !alt || book.altCategory?.toLowerCase() === alt.toLowerCase();
    return categ === "Kitab" && matchCateg && matchAlt;
  });
  categBooks.innerHTML = filtered.map(bookCardTemplate).join("");

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
              ${isSelected ? renderCategoryList(item, filterCategory, filterAlt) : ""}
            </li>`;
      })
      .join("")}
    </ul>
  `;
}

function renderCategoryList(item, filterCategory, filterAlt) {
  return `
    <ul class="pl-4 my-2.5 flex flex-col">
      ${item.categories
      .map((cat) => {
        const isSelected = filterCategory?.toLowerCase() === cat.title.toLowerCase();
        const hasBooks = books.some(
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
              ${isSelected && cat.altCateg?.length ? renderAltCategoryList(cat, item, filterAlt) : ""}
            </li>`;
      })
      .join("")}
    </ul>
  `;
}

function renderAltCategoryList(cat, item, filterAlt) {
  return `
    <ul class="pl-4 mt-2.5 flex flex-col">
      ${cat.altCateg
      .map((altName) => {
        const isSelected = filterAlt?.toLowerCase() === altName.toLowerCase();
        const hasBooks = books.some(
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

renderHeader();
renderBooks(books);
categList.innerHTML = generateListHTML(categs, books, categ, category, alt);