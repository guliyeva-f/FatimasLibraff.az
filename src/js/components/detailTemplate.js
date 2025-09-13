import { isFavorite } from "../utils/favoriteUtils.js";

export default function getDetailTemplate(book, discount) {
    const activeClass = isFavorite(book.id) ? "active" : "";
    return `<div class="bg-[#f6f6f8] w-[55%] rounded-3xl overflow-hidden flex justify-center bg-contain bg-no-repeat bg-center"
                                    style="background-image: url('${book.book_img}')"></div>
            <div class="w-[45%] px-[30px] flex flex-col gap-10">
                <span class="text-[#666] text-[14px] cursor-pointer">Kod: <i class="fa-regular fa-copy text-[16px]"></i>
                    ${book.code}</span>
                <div class="flex flex-col gap-4">
                    <div>
                        <h2 class="text-[32px] text-[#1e293b] font-semibold">${book.book_name}<span class="text-[#5CB338] lowercase text-[18px]"> (${book.genre})</span></h2>
                        <a class="text-[#3b4c64] text-[18px] capitalize underline" href="#">${book.author}</a>
                    </div>
                    <div class="border-[1px] rounded-2xl border-[#ccc] p-[15px_20px] flex gap-6 items-center">
                        <span
                            class="bg-[#ef33401a] text-[#ef3340] text-[28px] flex items-center justify-center rounded-full p-[20px_15px]"><i
                                class="fa-solid fa-tags"></i></span>
                        <div class="flex flex-col">
                            <span class="font-bold text-[#dc2626]">Onlayn sifarişlərə 20% endirim</span>
                            <p class="text-[#0f172a80]">Tarix: 01.05.2023</p>
                            <a href="#" class="text-[#3b4c64] flex items-center gap-2">Aksiya haqqında ətraflı məlumat
                                <span class="text-[10px] border-[1px] rounded-full p-[1px]"><i
                                        class="fa-solid fa-info"></i></span></a>
                        </div>
                    </div>
                    <div>
                        <p class="text-[28px] text-[#1e293b] font-extrabold">${book.sale.toFixed(2)}₼</p>
                        <div class="flex items-center gap-2.5">
                            <p class="text-[#666] text-[20px] line-through">${book.price.toFixed(2)}₼</p>
                            <span
                                class="p-[3px_6px] bg-[#ee2d39] text-[white] text-[14px] rounded-[8px] font-bold">-${discount}%</span>
                        </div>
                    </div>
                </div>
                <button
                    class="bg-[#ef3340] text-[18px] font-bold rounded-2xl py-[10px] text-white flex items-center gap-2 justify-center cursor-pointer"><i
                        class="fa-solid fa-cart-shopping"></i>Səbətə əlavə et</button>
                <div class="flex flex-col gap-6">
                    <div class="flex justify-between text-[16px] text-[#3b4c64]">
                    <button class="transition cursor-pointer flex items-center gap-2 text-[#ef3340] font-medium transform hover:scale-110 active:scale-95 ${activeClass}" data-id="${book.id}"
                        onclick="window.toggleFavorite(this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-7 h-7 transition-all duration-300 ease-in-out 
                                    stroke-[#ef3340] fill-transparent [button.active_&]:fill-[#ef3340] [button.active_&]:stroke-[#ef3340]">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21s-6-4.35-9-8.7C.7 8.15 2.64 3 7.5 3c2.28 0 3.87 1.35 4.5 2.25C12.63 4.35 14.22 3 16.5 3 21.36 3 23.3 8.15 21 12.3 18 16.65 12 21 12 21z"/>
                        </svg><span>Seçilmiş</span>
                    </button>
                        <a href="#" class="flex items-center gap-1.5 hover:text-[#ef3340] cursor-pointer font-medium"><i
                                class="fa-regular fa-circle-question"></i>Sizə necə kömək edə bilərik?</a>
                    </div>
                    <div class="text-[#64748b] flex flex-col text-[15px] gap-1 mt-5">
                        <h4 class="text-[20px] font-bold text-[#1e293b]">Çatdırılma haqqında</h4>
                        <p>Gəncə şəhəri üçün təxmini müddət və qiymətlər.</p>
                        <p class="flex items-center gap-1.5"><i class="fa-solid fa-shop text-[#475569]"></i>Mağazadan
                            təhvil alma — <strong class="text-[#475569]">pulsuz</strong>.</p>
                        <p class="flex items-center gap-1.5"><i class="fa-solid fa-truck text-[#475569]"></i>Kuryer ilə
                            — 24 saat ərzində — <strong class="text-[#475569]">pulsuz</strong>.</p>
                        <p class="flex items-center gap-1.5"><i
                                class="fa-solid fa-hand-holding-dollar text-[#475569]"></i>30 AZN və yuxarı sifarişlərdə
                            —
                            <strong class="text-[#475569]">pulsuz</strong>.
                        </p>
                        <div class="border-dashed border-t-2 my-2"></div>
                        <p class="flex items-center gap-1.5">Bölgələrə çatdırılma <strong
                                class="text-[#475569]">3-5</strong> iş günü ərzində.</p>
                    </div>
                </div>
            </div>`;
}