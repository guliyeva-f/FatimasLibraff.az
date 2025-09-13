// bu js fayl classics ve detail sehifesine nav yolu qaytarir

export default function navYolu(categ, category, alt, name) {
    const baseUrl = "/src/pages/books.html";

    const links = [
        `<li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="../../index.html">Əsas səhifə</a></li>`,
        categ && `<li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="${baseUrl}?categ=${encodeURIComponent(categ)}">${categ}</a></li>`,
        category && `<li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="${baseUrl}?categ=${encodeURIComponent(categ)}&category=${encodeURIComponent(category)}">${category}</a></li>`,
        alt && `<li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="${baseUrl}?categ=${encodeURIComponent(categ)}&category=${encodeURIComponent(category)}&alt=${encodeURIComponent(alt)}">${alt}</a></li>`,
        name && `<li><a class="text-[#0f172a]" href="#">${name}</a></li>`
    ].filter(Boolean);

    return links.join(`<span>/</span>`);
}
