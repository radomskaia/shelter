function mobileNav () {
    const burgerBtn = document.querySelector(".burger");
    const mobileNavBox = document.querySelector(".mobile-nav-box");
    const mobileNav = mobileNavBox.children[0];

    function toggleMobileNav() {
        console.log('ck')
        burgerBtn.classList.toggle("burger-icon__active");
        mobileNavBox.classList.toggle("mobile-nav-box_active");
        if (burgerBtn.classList.contains("burger-icon__active")) {
            mobileNavBox.addEventListener('click', closeMobileNav)
            document.body.style.overflow = 'hidden';
        } else {
            mobileNavBox.removeEventListener('click', closeMobileNav);
            document.body.style.overflow = '';
        }
    }

    function closeMobileNav(e) {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains('nav_link')) {
            mobileNavBox.style.transition = '0.3s'
            mobileNav.style.transition = '0.3s'
            toggleMobileNav()
            mobileNavBox.style.transition = '0.5s'
            mobileNav.style.transition = '0.5s'
            const targetId = target.getAttribute('href');
            if (!targetId) return;
            setTimeout(() => {
                if (targetId[0] === '#') document.querySelector(targetId).scrollIntoView({behavior: 'smooth'});
                else window.location.href = targetId;
            }, 300);
        }
        if (!mobileNav.contains(target) && !burgerBtn.contains(target)) toggleMobileNav()
    }

    burgerBtn.addEventListener("click", toggleMobileNav)
    mobileNav.addEventListener("click", closeMobileNav)
}

mobileNav()

