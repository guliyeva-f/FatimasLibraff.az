import { isFavorite } from "../utils/favoriteUtils.js";

export default function bookCardTemplate(book) {
  const activeClass = isFavorite(book.id) ? "active" : "";
  return `
    <div class="duration-200 hover:scale-102 cursor-pointer aspect-[1/2] relative rounded-[12px] overflow-hidden transition hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]">
     <button class="absolute top-3 right-3 z-10 transition transform hover:scale-110 active:scale-95 rounded-full p-1.5
               bg-[#ffffffd5] shadow-md hover:shadow-lg focus:outline-none ${activeClass}" data-id="${book.id}" onclick="window.toggleFavorite(this)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 transition-all duration-300 ease-in-out
                  stroke-gray-400 fill-transparent [button.active_&]:fill-[#ef3340] [button.active_&]:stroke-[#ef3340]">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21s-6-4.35-9-8.7C.7 8.15 2.64 3 7.5 3c2.28 0 3.87 1.35 4.5 2.25C12.63 4.35 14.22 3 16.5 3 21.36 3 23.3 8.15 21 12.3 18 16.65 12 21 12 21z"/>
        </svg></button>
    <div class="bg-[#f6f6f8] w-full h-[70%]">
        <a href="/src/pages/detail.html?id=${book.id}" class="w-full h-full flex items-center justify-center">
          <img class="object-contain h-full" src="${book.book_img}" alt="${book.book_name}" />
        </a>
      </div>
      <div class="p-[15px_10px] flex flex-col gap-2">
        <h3 class="text-[16px] text-[#0f172a]">${book.book_name}</h3>
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-semibold text-[#1e293b]">${book.sale}₼</span>
          <span class="text-sm text-[#767676] line-through">${book.price}₼</span>
        </div>
      </div>
    </div>
  `;
}