import { postBook } from "../services/HttpMethods.js"
import { getFormObj } from "./formData.js"
import loadBooks from "../admin.js"

export default async function createBookFunc() {
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

    await postBook(obj)
    console.log("işlədim");
    loadBooks()
}