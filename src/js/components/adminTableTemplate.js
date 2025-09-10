// bu js fayli admin panelin cedvelini qaytarir

export default function getTable(books) {
    return `<div class="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                    <h2 class="uppercase text-sm font-semibold text-[rgb(15,23,42)]">Kitab siyahısı</h2>
                                    <span class="text-sm text-[#34495E]">${books.length} kitab</span></div>
                                <div class="overflow-x-auto">
                <table class="min-w-full text-left align-middle">
                    <thead class="bg-[#7B7B7B] text-white text-[13px] uppercase tracking-wide">
                        <tr>
                        <th class="px-5 py-3">ID</th>
                        <th class="px-5 py-3">Kitab adı</th>
                        <th class="px-5 py-3">Şəkli</th>
                        <th class="px-5 py-3">Müəllif</th>
                        <th class="px-10 py-3">Janr</th>
                        <th class="px-5 py-3">Nəşriyyat</th>
                        <th class="px-5 py-3 text-right">Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>${books.map(book => `
                        <tr class="even:bg-[#F5F5F7] odd:bg-[#FFF] hover:bg-slate-100 transition">
                            <td class="px-6 py-4 text-[#34495E] font-bold">${book.id}</td>
                            <td class="px-6 py-4 font-semibold text-[#0F172A]">${book.book_name}</td>
                            <td class="px-6 py-4">
                                <div class="h-14 w-10 overflow-hidden rounded-lg ring-1 ring-slate-200">
                                <img class="w-full h-full object-cover"
                                    src="${book.book_img}"></div>
                            </td>
                            <td class="px-6 py-4 text-[#34495E] font-medium">${book.author}</td>
                            <td class="px-6 py-4 cursor-pointer">
                                <span class="inline-flex hover:bg-white rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium">${book.genre}</span>
                            </td>
                            <td class="px-6 py-4 text-[#34495E] font-medium">${book.publisher}</td>
                            <td class="px-6 py-4">
                                <div class="flex items-center justify-end gap-2">
                                <button onclick='openBookModal("edit", ${JSON.stringify(book)})'
                                    class="cursor-pointer rounded-xl px-3 py-2 text-sm ring-1 ring-slate-300 text-slate-600 hover:bg-white transition-all duration-200">
                                    <span class="flex items-center gap-1.5"><i class="fa-regular fa-pen-to-square"></i>Dəyiş</span>
                                </button>
                                <button onclick='deleteBookFunc(${book.id})'
                                    class="cursor-pointer rounded-xl px-3 py-2 text-sm ring-1 ring-red-400/40 text-[#CC0000] bg-white hover:bg-[#CC0000] hover:text-white hover:ring-white transition-all duration-200">
                                    <span class="flex items-center gap-1.5"><i class="fa-regular fa-trash-can"></i>Sil</span>
                                </button>
                                </div>
                            </td>
                        </tr>
                        `).join("")}
                    </tbody>
                </table></div>`;
}