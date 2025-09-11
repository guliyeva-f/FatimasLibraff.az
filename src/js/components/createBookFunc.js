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
        Swal.fire({
            title: "Bütün xanaları doldur!",
            icon: "info",
            draggable: true
        });
        return;
    }

    try {
        await postBook(obj);
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
            title: "Kitab uğurla yaradıldı!"
        });
        loadBooks();
    }
    catch (error) {
        Swal.fire({
            title: "Xəta baş verdi! (console bax)",
            icon: "error",
            draggable: true
        });
        console.log(error.message);
    }
}