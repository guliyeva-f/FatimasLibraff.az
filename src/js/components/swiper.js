var swiper = new Swiper(".mySwiper", {
    centeredSlides: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});

export default swiper;