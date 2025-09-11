// bu js fayl classics ve detail sehifesine nav yolu qaytarir

export default function navYolu(categ, category, alt, name) {
    const baseUrl = "/src/pages/books.html";

    const links = [
        `<a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="../../index.html">Əsas səhifə</a>`,
        categ && `<a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="${baseUrl}?categ=${encodeURIComponent(categ)}">${categ}</a>`,
        category && `<a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="${baseUrl}?categ=${encodeURIComponent(categ)}&category=${encodeURIComponent(category)}">${category}</a>`,
        alt && `<a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="${baseUrl}?categ=${encodeURIComponent(categ)}&category=${encodeURIComponent(category)}&alt=${encodeURIComponent(alt)}">${alt}</a>`,
        name && `<a href="#">${name}</a>`
    ].filter(Boolean);

    return links.join(`<span>/</span>`);
}