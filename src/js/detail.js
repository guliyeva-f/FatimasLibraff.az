import getBook from "../js/services/getBookById.js";
import categPopUp from "./components/categPopUp.js";
import navYolu from "./components/navYolu.js";
import getDetailTemplate from "./components/detailTemplate.js"

window.categPopUp = categPopUp;

const query = location.search;
const id = new URLSearchParams(query).get("id");

const catBooksHead = document.getElementById("catBooksHead");
const detSection = document.getElementById("detSection");

async function renderBook() {
    try {
        const book = await getBook(id);
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
        aboutBook.innerHTML = `<p>Aşağısı hələ yazılacaq</p><p>(description, dil, janr, publisher, pageCount və s burda olacaq)</p>`
    } 
    catch (err) {
        console.error("Kitab yüklənərkən xəta:", err);
        aboutBook.innerHTML = `<p>xəta baş verdi (console bax)</p>`;
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