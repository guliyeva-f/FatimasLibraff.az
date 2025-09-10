import fetchData from './fetchData.js';
// bu js datadan kitablari qaytarir

const BASE_URL = 'https://fatimas-libraff-data.onrender.com/books';

export default function getAllBooks(url = BASE_URL) {
    return fetchData(url);
}