// bu js datadan category`leri qaytarir

import fetchData from './fetchData.js';

const BASE_URL = `https://fatimas-libraff-data.onrender.com/categData`;

export default async function getAllCategs() {
    return await fetchData(BASE_URL);
}