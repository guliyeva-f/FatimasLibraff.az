import getAllBooks from "./services/getAllBooks.js";
import getTable from "./components/adminTableTemplate.js";
import openBookModal from './components/openBookModal.js';

window.openBookModal = openBookModal;

const booksSection = document.getElementById("booksTable");

export default async function loadBooks() {
    try {
        const books = await getAllBooks();

        if (!books.length) {
            booksSection.innerHTML = `<p class="text-2xl p-4 text-center text-gray-500">Heç bir kitab tapılmadı</p>`;
            return;
        }

        booksSection.innerHTML = getTable(books);
        document.getElementById("dynamicModal").innerHTML = "";
    } 
    catch (error) {
        console.error("Xəta:", error);
        booksSection.innerHTML = `<p class="text-2xl p-4 text-center text-red-500">Kitablar yüklənə bilmədi..(console bax)</p>`;
    }
}
loadBooks();