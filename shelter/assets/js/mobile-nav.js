// объявляем глобальные переменные
const burgerBtn = document.querySelector(".burger");
const mobileNavBox = document.querySelector(".mobile-nav-box");
const mobileNavEl = document.querySelector(".mobile-nav");

/**
 * Переключатель активности бургер-меню
 */
function toggleMobileNav() {
    burgerBtn.classList.toggle("burger-icon__active");
    mobileNavBox.classList.toggle("mobile-nav-box_active");

    // убираем/возвращаем скролл
    if (burgerBtn.classList.contains("burger-icon__active")) {
        mobileNavBox.addEventListener('click', closeMobileNav)
        document.body.style.overflow = 'hidden';
    } else {
        mobileNavBox.removeEventListener('click', closeMobileNav);
        document.body.style.overflow = '';
    }
}

/**
 * Закрытие мобильного меню, переход по ссылкам после закрытия
 */
function closeMobileNav(e) {
    e.preventDefault();
    const target = e.target;
    // плавно закрываем меню и переходим по ссылке
    if (target.classList.contains('nav_link')) {
        toggleMobileNav()
        const targetId = target.getAttribute('href');
        if (!targetId) return;
        function smoothScroll() {
            if (targetId[0] === '#') document.querySelector(targetId).scrollIntoView({behavior: 'smooth'});
            else window.location.href = targetId;
        }
        burgerBtn.addEventListener('transitionend', smoothScroll, { once: true });
    }

    // закрываем при клике на свободную от меню зону
    if (!mobileNavEl.contains(target) && !burgerBtn.contains(target)) toggleMobileNav()
}

/**
 * Автоматическое закрытие мобильного меню, при увеличении экрана до обычного меню
 */
function checkScreenWidth() {
    const screenWidth = document.documentElement.clientWidth;
    if (screenWidth > 768) {
        burgerBtn.classList.remove("burger-icon__active");
        mobileNavBox.classList.remove("mobile-nav-box_active");
    }
}

/**
 * Запускает работу мобильного меню
 */
export function mobileNav() {
    burgerBtn.addEventListener("click", toggleMobileNav)
    mobileNavEl.addEventListener("click", closeMobileNav)
    window.addEventListener('resize', checkScreenWidth)
}
