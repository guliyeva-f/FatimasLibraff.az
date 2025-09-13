// bu js fayli header ve overlay qaytarir

export function getHeader() {
    return `
    <header class="h-[120px] w-full flex items-center container px-[30px] m-auto">
        <div class="h-[48px] w-full flex justify-between gap-20">
            <div class="h-full flex shrink-0 transition duration-300 hover:drop-shadow-[0_0_5px_#ef3340]"><a href="../../index.html"><img class="h-full" src="../../src/assets/img/logo.png"></a></div>
            <div class="flex gap-[20px] w-full items-center">
                <div onclick="categPopUp(true)"
                    class="bg-[#ef3340] text-white justify-center h-full flex items-center gap-[8px] px-[20px] rounded-3xl font-bold cursor-pointer transition duration-300 hover:scale-105 hover:rotate-[-2deg] hover:shadow-lg hover:shadow-[#ef334055]">
                    <i class="fa-solid fa-list"></i><span>Kataloq</span>
                </div>
                <div class="w-full rounded-3xl border-2 border-[#cbd5e1] bg-[#f8fafc] h-[45px] 
                    flex items-center justify-between gap-10 px-5 
                    transition duration-300 hover:border-[#ef333fa0] hover:shadow-md">
                    <input type="text" class="h-full w-full outline-none bg-transparent" placeholder="Növbəti kitabınızı axtarın">
                    <i class="fa-solid fa-magnifying-glass cursor-pointer transition hover:scale-115 hover:text-[#ef3340]"></i>
                </div>
            </div>
            <div class="flex shrink-0 items-center gap-[20px]">
                <span class="flex font-bold text-[#1e293b] gap-1 items-center cursor-pointer transition hover:text-[#ef3340] hover:scale-105">
                    AZ <i class="fa-solid fa-angle-down text-[12px]"></i>
                    </span>
                    <a href="/src/pages/admin.html" class="flex gap-1 items-center bg-[#f4f6fc] rounded-[22px] h-full px-[10px] 
                                cursor-pointer transition hover:bg-[#ef3340] hover:text-white hover:shadow-md"><i class="fa-regular fa-circle-user text-[20px]"></i> <span class="font-bold">Admin Panel</span></a>
                <div class="flex gap-2.5">
                <a href="../../src/pages/favlar.html"><i class="fa-regular fa-heart text-[22px] cursor-pointer transition hover:scale-125 hover:text-[#ef3340]"></i></a>
                <i class="fa-regular fa-truck text-[22px] cursor-pointer transition hover:scale-125 hover:text-[#ef3340]"></i>
                </div>
            </div>
        </div>
    </header>
    <nav class="h-[50px] w-full flex justify-between items-center px-[30px] container m-auto text-[#334155]">
        <div class="font-bold">
            <ul class="flex gap-5">
                <li><a class="relative transition-colors duration-300 hover:text-[#ef3340] 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[2px] after:bg-[#ef3340] after:transition-all 
                        after:duration-300 hover:after:w-full" href="#">Bestseller - Iyul</a></li>
                <li><a class="relative transition-colors duration-300 hover:text-[#ef3340] 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[2px] after:bg-[#ef3340] after:transition-all 
                        after:duration-300 hover:after:w-full" href="#">Endirimlər</a></li>
                <li><a class="relative transition-colors duration-300 hover:text-[#ef3340] 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[2px] after:bg-[#ef3340] after:transition-all 
                        after:duration-300 hover:after:w-full" href="/src/pages/muellifler.html">Müəlliflər</a></li>
                <li><a class="relative transition-colors duration-300 hover:text-[#ef3340] 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1 
                        after:w-0 after:h-[2px] after:bg-[#ef3340] after:transition-all 
                        after:duration-300 hover:after:w-full" href="/src/pages/books.html?categ=Kitab&category=b%C9%99dii%20%C9%99d%C9%99biyyat&alt=Klassikl%C9%99r">Klassiklər</a></li>
            </ul>
        </div>
        <div>
            <ul class="flex gap-5">
                <li class="hover:font-bold duration-200 hover:text-[#1e293b]"><a href="#">Ödəniş və çatdırılma</a></li>
                <li class="hover:font-bold duration-200 hover:text-[#1e293b]"><a href="#">Loyallıq kartı</a></li>
                <li class="hover:font-bold duration-200 hover:text-[#1e293b]"><a href="#">FAQ</a></li>
                <li class="hover:font-bold duration-200 hover:text-[#1e293b]"><a href="#">Əlaqə</a></li>
            </ul>
        </div>
    </nav>
    `;
}

export function getOverlay() {
    return `
    <div id="overlayPopUp" class="bg-black/50 inset-0 fixed z-50 flex hidden justify-center items-center h-full">
        <div class="bg-white w-[90%] h-[80%] rounded-4xl overflow-hidden flex relative shadow-2xl"
            onclick="event.stopPropagation()">
            <div id="categData" class="flex-[1] flex flex-col mt-8"></div>
            <div id="category" class="flex-[1] flex flex-col bg-[#f5f5f7] pt-8"></div>
            <div id="altCategory" class="flex-[3] pt-10 pr-14 pl-4"></div>
            <button onclick="categPopUp(false)"
                class="absolute right-4 top-4 group w-10 h-10 duration-500 overflow-hidden cursor-pointer rounded-full"
                type="button">
                <p
                    class="text-3xl h-full w-full flex items-center justify-center text-black duration-500 relative z-10 group-hover:scale-0">
                    ✖ </p>
                <span
                    class="absolute w-full h-full bg-[#ef3340] rotate-45 group-hover:top-8 duration-500 top-12 left-0"></span>
                <span
                    class="absolute w-full h-full bg-[#ef3340] rotate-45 top-0 group-hover:left-8 duration-500 left-12"></span>
                <span
                    class="absolute w-full h-full bg-[#ef3340] rotate-45 top-0 group-hover:right-8 duration-500 right-12"></span>
                <span
                    class="absolute w-full h-full bg-[#ef3340] rotate-45 group-hover:bottom-8 duration-500 bottom-12 right-0"></span>
            </button>
        </div>
    </div>
    `;
}