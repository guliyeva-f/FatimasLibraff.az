import getAllBooks from "./services/getAllBooks.js";
import getTable from "./components/adminTableTemplate.js";
import openBookModal from './components/openBookModal.js';

window.openBookModal = openBookModal;

const booksSection = document.getElementById("booksTable");

export default async function loadBooks() {
    try {
        document.getElementById("dynamicModal").innerHTML = "";
        booksSection.innerHTML = `<div class="flex justify-center items-center py-20 w-full">
            <div class="loaderr"></div>
        </div>`;
        booksSection.innerHTML = `<div class="flex justify-center items-center py-20 w-full">
            <div class="loaderr"></div>
        </div>`;
        const delay = new Promise(resolve => setTimeout(resolve, 1000));
        const [books] = await Promise.all([getAllBooks(), delay]);

        if (!books.length) {
            booksSection.innerHTML = `<p class="text-2xl p-4 text-center text-gray-500">Heç bir kitab tapılmadı</p>`;
            return;
        }

        booksSection.innerHTML = getTable(books);
    }
    catch (error) {
        console.error(error);
        booksSection.innerHTML = `<p class="text-2xl p-4 text-center text-red-500">Kitablar yüklənə bilmədi..(console bax)</p>`;
    }
}
loadBooks();