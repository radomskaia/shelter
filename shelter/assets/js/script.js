import {mobileNav} from "./mobile-nav.js";
import {sliderCarousel} from "./slider-carusel.js";
import {modalWindow} from "./modal-window__popup.js";

mobileNav()
sliderCarousel()
modalWindow('main')

console.log(`
Для удобства проверки слайдера-карусели добавила события на кнопки стрелок вправо и влево =)

Оценка за задание - 110 баллов
Все требования к функционалу выполнены

1 Реализация burger menu на обеих страницах: +26
2 Реализация слайдера-карусели на странице Main: +36
3 Реализация пагинации на странице Pets: +36
4 Реализация попап на обеих страницах: +12
`)
