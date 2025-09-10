import getAllCategs from "../services/getAllCategs.js";
import createBookFunc from "./createBookFunc.js";
import editBookFunc from "./editBookFunc.js";
import deleteBookFunc from "./deleteBookFunc.js";
import { resetFormObj, setFormObj } from "./formData.js";

export default async function openBookModal(mode = "create", book) {
  resetFormObj();

  const categData = await getAllCategs();
  const categinKitabi = categData.find(d => d.title === "Kitab");
  const categories = categinKitabi ? categinKitabi.categories : [];

  const container = document.getElementById("dynamicModal");
  container.innerHTML = "";
  const title = mode === "edit" ? "Kitabı redaktə et" : "Yeni kitab əlavə et";
  const btnText = mode === "edit" ? "Dəyiş" : "Yarat";

  container.innerHTML = `<div id="BookModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl w-[600px] p-6 shadow-lg relative">
          <button id="closeModal"
              class="absolute top-5 right-5 text-gray-500 hover:text-red-500 cursor-pointer">
              <i class="fa-solid fa-xmark text-xl"></i>
          </button>
          <h2 class="text-[20px] font-bold mb-5">${title}</h2>
          <form id="BookForm" class="flex flex-col items-center gap-5">
            <div class="grid grid-cols-2 gap-4 w-full">
              <input onchange="getValue(event)" type="text" name="book_name" placeholder="Kitab adı" class="border p-2 rounded col-span-2" required>
              <input onchange="getValue(event)" type="text" name="book_img" placeholder="Şəkil linki" class="border p-2 rounded col-span-2" required>
              <input onchange="getValue(event)" type="number" name="price" placeholder="Qiymət" class="border p-2 rounded">
              <input onchange="getValue(event)" type="text" name="genre" placeholder="Janr" class="border p-2 rounded">
              <input onchange="getValue(event)" type="text" name="author" placeholder="Müəllif" class="border p-2 rounded col-span-2">
              <select onchange="getValue(event)" name="category" id="categorySelect" class="border p-2 rounded">
                  <option selected disabled>Kateqoriya seç</option>
              </select>
              <select onchange="getValue(event)" name="altCategory" id="altCategorySelect" class="border p-2 rounded">
                  <option selected disabled>Alt kateqoriya seç</option>
              </select>
              <input onchange="getValue(event)" type="text" name="publisher" placeholder="Nəşriyyat" class="border p-2 rounded">
              <input onchange="getValue(event)" type="text" name="language" placeholder="Dil" class="border p-2 rounded">
              <textarea onchange="getValue(event)" name="description" placeholder="Təsvir" class="border p-2 rounded col-span-2"></textarea>
              <input onchange="getValue(event)" type="number" name="pageCount" placeholder="Səhifə sayı" class="border p-2 rounded">
              <input onchange="getValue(event)" type="number" name="stockCount" placeholder="Stok sayı" class="border p-2 rounded">
            </div>
            <button onclick="${mode}BookFunc(${book ? book.id : ''})" type="button" class="rounded-xl px-10 cursor-pointer py-2 bg-gradient-to-r from-[#CC0000] to-[#EF3340] text-white font-bold hover:from-red-700 hover:to-red-600 transition">${btnText}</button>
          </form>
        </div>
      </div>
    `;

  document.getElementById("closeModal").addEventListener("click", () => container.innerHTML = "");

  const categorySelect = document.getElementById("categorySelect");
  const altCategorySelect = document.getElementById("altCategorySelect");
  categorySelect.innerHTML = `<option selected disabled>Kateqoriya seç</option>
  ${categories.map(cat => `<option value="${cat.title}">${cat.title}</option>`).join("")}`;

  categorySelect.addEventListener("change", (e) => {
    const selectedCat = categories.find(c => c.title === e.target.value);
    altCategorySelect.innerHTML = `<option selected disabled>Alt kateqoriya seç</option>` +
      (selectedCat && Array.isArray(selectedCat.altCateg)
        ? selectedCat.altCateg.map(sub => `<option value="${sub}">${sub}</option>`).join("") : "");
  });

  if (mode === "edit" && book) {
    const form = document.getElementById("BookForm");

    form.book_name.value = book.book_name;
    form.book_img.value = book.book_img;
    form.price.value = book.price;
    form.genre.value = book.genre;
    form.author.value = book.author;
    form.publisher.value = book.publisher;
    form.language.value = Array.isArray(book.language)
      ? book.language.join(" ")
      : (book.language || "");
    form.description.value = book.description;
    form.pageCount.value = book.pageCount;
    form.stockCount.value = book.stockCount;

    if (book.category) {
      categorySelect.value = book.category;
      const selectedCat = categories.find(c => c.title === book.category);
      altCategorySelect.innerHTML = `<option selected disabled>Alt kateqoriya seç</option>` +
        (selectedCat && Array.isArray(selectedCat.altCateg)
          ? selectedCat.altCateg.map(sub => `<option value="${sub}">${sub}</option>`).join("")
          : "");
      if (book.altCategory) {
        altCategorySelect.value = book.altCategory;
      }
    }

    setFormObj({
      ...book,
      language: Array.isArray(book.language)
        ? book.language
        : book.language
          ? [book.language]
          : [],
      sale: book.price - (book.price * 0.2)
    });

  }
};

document.openBookModal = openBookModal;
document.editBookFunc = editBookFunc;
document.createBookFunc = createBookFunc;
document.deleteBookFunc = deleteBookFunc;