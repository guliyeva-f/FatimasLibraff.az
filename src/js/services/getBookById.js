import fetchData from './fetchData.js';

export default async function getBook(id, options = {}) {
    const BASE_URL = `https://fatimas-libraff-data.onrender.com/books/${id}`;
    return await fetchData(BASE_URL, options.method || "GET", options.body, options.headers || {});
}