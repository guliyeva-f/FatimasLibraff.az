import fetchData from "./fetchData.js";

const BASE_URL = "https://fatimas-libraff-data.onrender.com/books";

export async function postBook(newBook) {
  return await fetchData(BASE_URL, "POST", newBook);
}

export async function patchBook(id, partialUpdate) {
  return await fetchData(`${BASE_URL}/${id}`, "PATCH", partialUpdate);
}

export async function deleteBook(id) {
  return await fetchData(`${BASE_URL}/${id}`, "DELETE");
}