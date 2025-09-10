import { patchBook } from "../services/HttpMethods.js"
import getBookById from "../services/getBookById.js"
import loadBooks from "../admin.js"
import { getFormObj } from "./formData.js"

export default async function editBookFunc(id) {
    const book = await getBookById(id);

    if (!book) {
        alert("Kitab tapılmadı!");
        return;
    }
    const obj = getFormObj();

    if (
        !obj.book_name || !obj.book_img || !obj.price || !obj.genre || !obj.author ||
        !obj.category || !obj.altCategory || !obj.publisher ||
        !obj.description || !obj.pageCount || !obj.stockCount ||
        !obj.language || obj.language.length === 0
    ) {
        alert("Bütün xanaları doldur!");
        return;
    }

    await patchBook(id, obj);
    loadBooks();
}