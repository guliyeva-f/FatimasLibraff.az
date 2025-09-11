import getBook from "../js/services/getBookById.js";
import categPopUp from "./components/categPopUp.js";
import navYolu from "./components/navYolu.js";
import getDetailTemplate from "./components/detailTemplate.js"

window.categPopUp = categPopUp;

const query = location.search;
const id = new URLSearchParams(query).get("id");
const mainSec = document.getElementById("mainSec");

async function renderBook() {
    try {
        mainSec.innerHTML = `<div class="flex justify-center items-center py-20 w-full">
            <div class="loaderr"></div>
        </div>`;

        const delay = new Promise(resolve => setTimeout(resolve, 500));
        const [book] = await Promise.all([getBook(id), delay]);

        mainSec.innerHTML = `
            <div class="px-[30px] m-auto container">
                <hr class="text-gray-300">
                <div id="catBooksHead"></div>
            </div>
            <section id="detSection" class="container px-[30px] m-auto gap-5 mt-[25px] flex items-stretch"></section>
            <section id="aboutBook" class="container m-auto px-[30px] mt-16 mb-8"></section>
        `;

        const catBooksHead = document.getElementById("catBooksHead");
        const detSection = document.getElementById("detSection");
        const aboutBook = document.getElementById("aboutBook");

        if (!book.code) {
            const newCode = generateUniqueCode();
            const updatedBook = await updateBookCode(id, newCode);
            book.code = updatedBook?.code || newCode;
        }
        catBooksHead.innerHTML = `
            <ul class="flex items-center text-[#555] gap-2 mt-5">
                ${navYolu("Kitab", book.category, book.altCategory, book.book_name)}
            </ul>
        `;
        const discount = calculateDiscount(book.price, book.sale);
        detSection.innerHTML = getDetailTemplate(book, discount);

        aboutBook.innerHTML = `<div x-data="{ selectedTab: 'desc' }" class="w-full">
                <div class="flex justify-center gap-24 border-b border-gray-300" role="tablist">
                    <button @click="selectedTab = 'desc'" :class="selectedTab === 'desc' 
          ? 'text-[#1e293b] font-extrabold border-b-3 border-red-600' 
          : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent hover:border-red-400'"
                        class="px-2 py-2 text-[22px] cursor-pointer" role="tab" aria-controls="tabpanelDesc">
                        Təsvir</button>
                    <button @click="selectedTab = 'specs'" :class="selectedTab === 'specs' 
          ? 'text-[#1e293b] font-extrabold border-b-3 border-red-600' 
          : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent hover:border-red-400'"
                        class="px-2 py-2 text-[22px] cursor-pointer" role="tab" aria-controls="tabpanelSpecs">
                        Xüsusiyyəti</button>
                </div>
                <div class="py-4 w-[70%] m-auto">
                    <div x-show="selectedTab === 'desc'" x-cloak id="tabpanelDesc" role="tabpanel">
                        <p class="text-[20px] text-[#0f172a] leading-10 text-justify">${book.description}</p>
                    </div>
                    <div x-show="selectedTab === 'specs'" x-cloak id="tabpanelSpecs" role="tabpanel" class="flex gap-40 text-[20px] justify-center mt-5">       
                        <div class="flex flex-col gap-3"><p class="text-[#767676]">Müəllif<span>...............</span><span class="text-[#0f172a]">${book.author}</span></p>
                        <p class="text-[#767676]">Janr<span>...............</span><span class="text-[#0f172a]">${book.genre}</span></p></div>
                        <div class="flex flex-col gap-3"><p class="text-[#767676]">Nəşriyyat<span>...............</span><span class="text-[#0f172a]">${book.publisher}</span></p>
                        <p class="text-[#767676]">Səhifə sayı<span>...............</span><span class="text-[#0f172a]">${book.pageCount}</span></p></div>
                </div>
            </div>`;
    }
    catch (err) {
        console.error(err);
        mainSec.innerHTML = `<p class="text-red-500 text-center py-10">Xıta baş verdi (console bax)</p>`;
    }
}

function generateUniqueCode() {
    // bu func 13 reqemli kod yaradir
    return String(Math.floor(Math.random() * 1e13)).padStart(13, "0");
}

async function updateBookCode(id, code) {
    try {
        const res = await getBook(id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
        });

        if (!res.ok) throw new Error("Kod update olunmadı");
        return await res.json();
    } catch (err) {
        console.error("Kod update xətası:", err);
        return null;
    }
}

function calculateDiscount(price, sale) {
    if (!price || price <= 0) return 0;
    return Math.round((1 - sale / price) * 100);
}
renderBook();