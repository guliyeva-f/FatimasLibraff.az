import getAllCategs from "../services/getAllCategs.js";
import getAllBooks from "../services/getAllBooks.js";

// bu js fayli achilan categ modalinin icerisini dinamik olaraq doldurur

const categData = document.getElementById("categData"); // 1ci div
const category = document.getElementById("category"); // 2ci div
const altCategory = document.getElementById("altCategory"); // 3cu div

let categsData = [];
let booksData = [];

export async function initBooks() {
  booksData = await getAllBooks();
}

// 1ci divin melumatlari
export async function renderMainCategories() {
  if (!categsData.length) {
    categsData = await getAllCategs();
  }

  categData.innerHTML = categsData
    .map(({ title, categories }) => {
      const hasSub = categories?.length > 0;
      return `
        <div class="flex items-center justify-between text-[14px] group cursor-pointer p-[10px_25px] hover:bg-[#f5f5f7] text-[#0f172a] transition"
             onmouseover="renderSubCategories('${title}')">
          <a href="${buildBookUrl({ parentCateg: title })}" class="hover:text-[#ef3340]">
            ${title}
          </a>
          ${hasSub ? '<i class="fa-solid fa-angle-right group-hover:text-[#ef3340] text-[10px]"></i>' : ''}
        </div>
      `;
    })
    .join("");
}

// 2ci divin melumatlari
window.renderSubCategories = function (parentTitle) {
  const parent = categsData.find((item) => item.title === parentTitle);
  category.innerHTML = "";
  altCategory.innerHTML = "";

  if (!parent?.categories) return;

  category.innerHTML = parent.categories
    .map(({ title: catTitle, altCateg }) => {
      const hasBooks = booksData.some(
        (book) => book.category.toLowerCase() === catTitle.toLowerCase()
      );
      return `
        <div class="flex items-center p-[10px_25px] group text-[14px] text-[#0f172a] justify-between cursor-pointer hover:bg-white hover:text-[#ef3340] transition"
             onmouseover="renderAltCategories('${catTitle}', '${parentTitle}')">
          <a href="${buildBookUrl({ parentCateg: parentTitle, category: catTitle })}" 
             class="flex items-center gap-2 hover:text-[#ef3340]">
            ${getCircleIcon(hasBooks)}${catTitle}
          </a>
          ${altCateg?.length ? '<i class="fa-solid fa-angle-right group-hover:text-[#ef3340] text-[10px]"></i>' : ''}
        </div>
      `;
    })
    .join("");
};

// 3cu divin melumatlari
window.renderAltCategories = function (catTitle, parentTitle) {
  const parent = categsData.find((item) => item.title === parentTitle);
  const categoryObj = parent?.categories?.find((cat) => cat.title === catTitle);
  altCategory.innerHTML = "";

  if (!categoryObj?.altCateg) return;

  altCategory.innerHTML = `
    <div class="grid grid-cols-3 gap-5">
      ${categoryObj.altCateg
        .map((alt) => {
          const hasBooks = booksData.some(
            (book) =>
              book.category.toLowerCase() === catTitle.toLowerCase() &&
              book.altCategory.toLowerCase() === alt.toLowerCase()
          );
          return `
            <div class="text-[#0f172a] flex items-center gap-2 text-[14px] cursor-pointer transition">
              <a href="${buildBookUrl({ parentCateg: parentTitle, category: catTitle, alt })}" 
                 class="underline hover:text-[#ef3340]">
                ${alt}
              </a>
              ${getCircleIcon(hasBooks)}
            </div>
          `;
        })
        .join("")}
    </div>
  `;
};

function getCircleIcon(hasBooks) {
  return hasBooks ? '<i class="fa-solid fa-circle text-[#ef3340] text-[6px]"></i>' : '';
}

function buildBookUrl({ parentCateg, category, alt }) {
  let url = `/src/pages/books.html?categ=${encodeURIComponent(parentCateg)}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  if (alt) url += `&alt=${encodeURIComponent(alt)}`;
  return url;
}
