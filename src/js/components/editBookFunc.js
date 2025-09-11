import { patchBook } from "../services/HttpMethods.js"
import getBookById from "../services/getBookById.js"
import loadBooks from "../admin.js"
import { getFormObj } from "./formData.js"

export default async function editBookFunc(id) {
    const book = await getBookById(id);

    if (!book) {
        Swal.fire({
            title: "Kitab tapılmadı!",
            icon: "info",
            draggable: true
        });
        return;
    }
    const obj = getFormObj();

    if (
        !obj.book_name || !obj.book_img || !obj.price || !obj.genre || !obj.author ||
        !obj.category || !obj.altCategory || !obj.publisher ||
        !obj.description || !obj.pageCount || !obj.stockCount ||
        !obj.language || obj.language.length === 0
    ) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "info",
            title: "Bütün xanaları doldur!"
        });
        return;
    }

    try {
        await patchBook(id, obj);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Kitab uğurla dəyişdirildi!"
        });
        loadBooks();
    } catch (error) {
        Swal.fire({
            title: "Xəta baş verdi! (console bax)",
            icon: "error",
            draggable: true
        });
        console.log(error.message);
    }
}