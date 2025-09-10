// bu js fayl apiyə sorgu atir

async function fetchData(url, method = "GET", body = null, headers = {}) {
    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error(`Fetch error (${url}):`, error.message);
        throw error;
    }
}

export default fetchData;