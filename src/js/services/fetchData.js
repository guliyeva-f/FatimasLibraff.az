// bu js fayl api`yə sorgu atir

async function fetchData(url, options = {}) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
    }
    catch (error) {
        console.error(`Fetch error (${url}):`, error.message);
        throw error;
    }
}

export default fetchData;