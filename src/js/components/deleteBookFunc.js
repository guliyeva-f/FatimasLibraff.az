import { deleteBook } from "../services/HttpMethods.js";
import loadBooks from "../admin.js";

export default async function deleteBookFunc(id) {
  const confirmDelete = confirm("Bu kitabı silmək istədiyinə əminsən?");

  if (!confirmDelete) return;

  try {
    await deleteBook(id);
    console.log("Kitab silindi:", id);
    loadBooks();
  } 
  catch (error) {
    console.error("Kitab silinərkən xəta:", error);
    alert("Kitabı silmək mümkün olmadı!");
  }
}
