// bu js datadan kitablari qaytarir

import fetchData from './fetchData.js';

const BASE_URL = 'https://fatimas-libraff-data.onrender.com/books';

export default function getAllBooks(url = BASE_URL) {
    return fetchData(url);
}