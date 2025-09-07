// bu js datadan id`sine gore 1 kitab qaytarir

import fetchData from './fetchData.js';

export default async function getBook(id) {
    const BASE_URL = `https://fatimas-libraff-data.onrender.com/books/${id}`;
    return await fetchData(BASE_URL);
}