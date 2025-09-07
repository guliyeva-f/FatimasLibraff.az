// bu js fayl card shablonu qaytarir

export default function bookCardTemplate(book) {
    return `
    <div class="duration-200 hover:scale-102 cursor-pointer aspect-[1/2] relative rounded-[12px] overflow-hidden transition hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)]">
      <div class="bg-[#f6f6f8] w-full h-[70%]">
        <a href="/src/pages/detail.html?id=${book.id}" class="w-full h-full flex items-center justify-center">
          <img class="object-contain h-full" src="${book.book_img}" alt="${book.book_name}" />
        </a>
      </div>
      <div class="p-[15px_10px] flex flex-col gap-2">
        <h3 class="text-[16px] text-[#0f172a]">${book.book_name}</h3>
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-semibold text-[#1e293b]">${book.price}₼</span>
          <span class="text-sm text-[#767676] line-through">${book.sale}₼</span>
        </div>
      </div>
    </div>
  `;
}