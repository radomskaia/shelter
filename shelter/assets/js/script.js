import {shuffleArray} from "./pagination.js";

const pets = [
    {
        "name": "Jennifer",
        "img": "assets/img/pets_500px/jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "assets/img/pets_500px/sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "assets/img/pets_500px/woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": "assets/img/pets_500px/scarlett.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": "assets/img/pets_500px/katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "assets/img/pets_500px/timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "assets/img/pets_500px/freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "assets/img/pets_500px/charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
]

function mobileNav() {
    const burgerBtn = document.querySelector(".burger");
    const mobileNavBox = document.querySelector(".mobile-nav-box");
    const mobileNav = mobileNavBox.children[0];

    function toggleMobileNav() {
        // console.log('ck')
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

function sliderCarousel() {
    const petsArr = Array.from({length: 8}, (_, i) => i)
    shuffleArray(petsArr)

    const btnRight = document.querySelector(".slider_btn-right");
    const btnLeft = document.querySelector(".slider_btn-left");
    const cardsBox = document.querySelectorAll('.cards-list-box');

    let currentCardsIndex = [];
    let previousCardsIndex = [];
    let nextCardsIndex = [];
    let numOfCards = 3;
    let screenWidth = document.documentElement.clientWidth;

    function checkScreenWidth() {
        // screenWidth = window.innerWidth;
        screenWidth = document.documentElement.clientWidth;
        const prevEl = document.querySelector('.prev');
        const nextEl = document.querySelector('.next');
        const currEl = document.querySelector('.curr');
        const addCards = () => {
            while (currEl.children.length > 0 && currEl.children.length < numOfCards) {
                const additionalCard = petsArr.pop();
                currentCardsIndex.push(additionalCard);
                createPetsCards([additionalCard], 'curr');
            }
            while (prevEl.children.length > 0 && prevEl.children.length < numOfCards) {
                const additionalCard = petsArr.pop();
                previousCardsIndex.push(additionalCard);
                createPetsCards([additionalCard], 'prev')
            }

            while (nextEl.children.length > 0 && nextEl.children.length < numOfCards) {
                const additionalCard = petsArr.pop();
                nextCardsIndex.push(additionalCard);
                createPetsCards([additionalCard], 'next');
            }
        }

        const removeCard = () => {
            while (currEl.children.length > numOfCards) {
                currEl.removeChild(currEl.lastElementChild);
                petsArr.push(currentCardsIndex.pop())
            }

            while (prevEl.children.length > numOfCards) {
                prevEl.removeChild(prevEl.lastElementChild);
                petsArr.push(previousCardsIndex.pop())
                // console.log('DELETE');
            }

            while (nextEl.children.length > numOfCards) {
                nextEl.removeChild(nextEl.lastElementChild);
                petsArr.push(nextCardsIndex.pop())
            }
            shuffleArray(petsArr)
        }
        if (screenWidth > 1077) {
            numOfCards = 3;
            addCards();
            removeCard()
        }

        if (screenWidth <= 1077 && screenWidth > 576) {
            numOfCards = 2;
            addCards()
            removeCard()
        }

        if (screenWidth <= 576) {
            numOfCards = 1;
            removeCard()
        }


        // console.log(numOfCards)
        // console.log(nextCardsIndex, currentCardsIndex, previousCardsIndex, petsArr);
        // console.log(nextCardsIndex, currentCardsIndex, previousCardsIndex, petsArr);
    }

    checkScreenWidth()

    window.addEventListener('resize', checkScreenWidth)


    for (let i = 0; i < numOfCards; i++) {
        currentCardsIndex.push(petsArr.pop());
    }

    function createPetsCards(indexArr, position) {
        const cardsList = document.querySelector(`.${position}`);
        indexArr.forEach((petIndex) => {
            const petCard = document.createElement('li')
            petCard.classList.add("card-item", 'page1')
            petCard.setAttribute('data-index', petIndex)
            petCard.innerHTML = `<img class="card_img" src="${pets[petIndex].img}" alt="Photo of pet">
                        <h4 class="header_4">${pets[petIndex].name}</h4>
                        <a class="btn button_secondary modal_btn" href="#">Learn more</a>`
            cardsList.append(petCard)
        })
    }

    createPetsCards(currentCardsIndex, 'curr')

    function deletePetsCards(position) {
        position = position === 'next' ? 'prev' : 'next';
        const element = document.querySelector(`.${position}`)
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }


    function showNextCards(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const allCardsList = document.querySelectorAll('.cards-list');
        const deleteBool = allCardsList.length > 1;
        const prevEl = document.querySelector('.prev');
        const nextEl = document.querySelector('.next');
        const currEl = document.querySelector('.curr');

        // возвращаем индексы из ненужной переменной и шафлим
        for (let i = previousCardsIndex.length; i > 0; i--) {
            petsArr.push(previousCardsIndex.pop())
        }
        shuffleArray(petsArr)

        // берем индексы для новой тройки, создаем карточки
        if (nextCardsIndex.length === 0) {
            for (let i = 0; i < numOfCards; i++) {
                nextCardsIndex.push(petsArr.pop())
            }
            createPetsCards(nextCardsIndex, 'next')
        }

        // анимация
        setTimeout(() => {
            btnLeft.disabled = true;
            btnRight.disabled = true;
            btnLeft.removeEventListener("click", showNextCards)
            btnRight.removeEventListener("click", showPrevCards)

            allCardsList.forEach((item) => {
                item.style.transition = 'all 0.5s';
                item.style.transform = 'translateX(-110%)';
            })

            if (deleteBool) {
                setTimeout(() => {
                    allCardsList.forEach((item) => {
                        item.style.transition = '';
                    })

                    deletePetsCards('next');
                    nextEl.classList.remove('next');
                    nextEl.classList.add('curr');
                    currEl.classList.remove('curr');
                    currEl.classList.add('prev');
                    prevEl.classList.remove('prev');
                    prevEl.classList.add('next');

                    allCardsList.forEach((item) => {
                        item.style.transform = `translateX(0)`;
                    })

                    // console.log(currEl);
                    btnLeft.disabled = false;
                    btnRight.disabled = false;
                    btnLeft.addEventListener("click", showNextCards)
                    btnRight.addEventListener("click", showPrevCards)
                }, 500);
            }
        }, 2)

        // обновляем переменные с индексами
        previousCardsIndex = [...currentCardsIndex];
        currentCardsIndex = [...nextCardsIndex];
        nextCardsIndex = [];
    }

    function showPrevCards(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const allCardsList = document.querySelectorAll('.cards-list');
        const prevEl = document.querySelector('.prev');
        const nextEl = document.querySelector('.next');
        const currEl = document.querySelector('.curr');
        const deleteBool = allCardsList.length > 1;
        for (let i = nextCardsIndex.length; i > 0; i--) {
            petsArr.push(nextCardsIndex.pop())
        }
        shuffleArray(petsArr)
        if (previousCardsIndex.length === 0) {
            for (let i = 0; i < numOfCards; i++) {
                previousCardsIndex.push(petsArr.pop())
            }
            createPetsCards(previousCardsIndex, 'prev')
        }


        setTimeout(() => {
            allCardsList.forEach((item) => {
                item.style.transition = 'all 0.5s';
                item.style.transform = 'translateX(110%)';
            })

            if (deleteBool) {
                btnLeft.disabled = true;
                btnRight.disabled = true;
                btnLeft.removeEventListener("click", showNextCards)
                btnRight.removeEventListener("click", showPrevCards)
                setTimeout(() => {
                    allCardsList.forEach((item) => {
                        item.style.transition = '';
                    })

                    deletePetsCards('prev');
                    prevEl.classList.remove('prev');
                    prevEl.classList.add('curr');
                    currEl.classList.remove('curr');
                    currEl.classList.add('next');
                    nextEl.classList.remove('next');
                    nextEl.classList.add('prev');

                    allCardsList.forEach((item) => {
                        item.style.transform = `translateX(0)`;
                    })


                    btnLeft.disabled = false;
                    btnRight.disabled = false;
                    btnLeft.addEventListener("click", showNextCards)
                    btnRight.addEventListener("click", showPrevCards)
                }, 500);
            }
        }, 20)


        // console.log(nextCardsIndex, currentCardsIndex, previousCardsIndex, petsArr);
        nextCardsIndex = [...currentCardsIndex];
        currentCardsIndex = [...previousCardsIndex];
        previousCardsIndex = [];
    }

    btnLeft.addEventListener("click", showNextCards)
    btnRight.addEventListener("click", showPrevCards)
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' && btnLeft.disabled === false && btnRight.disabled === false) {
            showNextCards()
        }
        if (e.key === 'ArrowRight' && btnLeft.disabled === false && btnRight.disabled === false) {
            showPrevCards()
        }
    });

}

sliderCarousel()
