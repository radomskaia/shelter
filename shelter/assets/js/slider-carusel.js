import {createPetsCards, shuffleArray, deletePetsCards} from "./utils.js";

// объявление глобальных переменных
const btnRight = document.querySelector(".slider_btn-right");
const btnLeft = document.querySelector(".slider_btn-left");
let currentCardsIndex = [];
let previousCardsIndex = [];
let nextCardsIndex = [];
let numOfCards, screenWidth, petsArr, showPrevCards, showNextCards, boxWidth;

/**
 * Определение количество карточек, отображаемых на экране.
 * Добавление/удаление карточек при изменении ширины экрана.
 */
function checkScreenWidth() {
    screenWidth = document.documentElement.clientWidth;
    boxWidth = document.querySelector('.cards-list-box').clientWidth;
    const currEl = document.querySelector('.curr');
    const lastEl = document.querySelector('.prev') || document.querySelector('.next');
    let lastCardsIndex, position;
    if (lastEl) {
        position = lastEl.classList.contains('prev') ? 'prev' : 'next';
        lastCardsIndex = position === 'prev' ? previousCardsIndex : nextCardsIndex;
    }

    const addCards = () => {
        while (currEl?.children.length > 0 && currEl?.children.length < numOfCards) {
            const additionalCard = petsArr.pop();
            currentCardsIndex.push(additionalCard);
            createPetsCards([additionalCard], 'curr', false);
        }
        while (lastEl?.children.length > 0 && lastEl?.children.length < numOfCards) {
            const additionalCard = petsArr.pop();
            lastCardsIndex.push(additionalCard);
            createPetsCards([additionalCard], position, false)
        }
    }

    const removeCard = () => {
        while (currEl?.children.length > numOfCards) {
            currEl.removeChild(currEl.lastElementChild);
            petsArr.push(currentCardsIndex.pop())
        }

        while (lastEl?.children.length > numOfCards) {
            lastEl.removeChild(lastEl.lastElementChild);
            petsArr.push(lastCardsIndex.pop())
        }
        shuffleArray(petsArr)
    }
    if (screenWidth > 1077) {
        numOfCards = 3;
        addCards();
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
}

function btnDisabled(bool) {
    btnLeft.disabled = bool;
    btnRight.disabled = bool;
    if (bool) {
        btnLeft.removeEventListener("click", showPrevCards)
        btnRight.removeEventListener("click", showNextCards)
        document.removeEventListener('keydown', keyMove);
    } else {
        btnLeft.addEventListener("click", showPrevCards)
        btnRight.addEventListener("click", showNextCards)
        document.addEventListener('keydown', keyMove);
    }
}


/**
 * @param position может иметь значение 'next' или 'prev'
 * Создает и показывает необходимое количество карточек, сохряняя одно предыдущее состояние
 */
function showNewCards() {
    // выключаем кнопки на время анимации
    btnDisabled(true)

    const position = this;
    const newPosition = position === 'next' ? 'prev' : 'next';
    const currEl = document.querySelector('.curr');
    let newIndexEl, lastIndexEl, startTranslateX, animationTranslateX, endTranslateX;
    // определяем направление движение и массив для новых карточек
    if (position === 'next') {
        newIndexEl = nextCardsIndex;
        lastIndexEl = previousCardsIndex;

        if (document.querySelector(`.${newPosition}`)) {
            startTranslateX = 'translateX(-110%)';
            endTranslateX = startTranslateX;
            animationTranslateX = 'translateX(-220%)';

        } else {
            startTranslateX = 'translateX(0)';
            endTranslateX = 'translateX(-110%)';
            animationTranslateX = endTranslateX;
        }
    } else {
        newIndexEl = previousCardsIndex;
        lastIndexEl = nextCardsIndex;
        startTranslateX = 'translateX(-110%)';
        endTranslateX = 'translateX(0)';
        animationTranslateX = endTranslateX;
    }

    // возвращаем индексы из ненужной переменной и шафлим
    for (let i = lastIndexEl.length; i > 0; i--) {
        petsArr.push(lastIndexEl.pop())
    }
    shuffleArray(petsArr)

    // берем индексы для новой тройки, создаем карточки
    if (newIndexEl.length === 0) {
        for (let i = 0; i < numOfCards; i++) {
            newIndexEl.push(petsArr.pop())
        }
        createPetsCards(newIndexEl, position)
    }

    const allCardsList = document.querySelectorAll('.cards-list');
    const newEl = document.querySelector(`.${position}`);


    // задаем положение карточек до анимации
    allCardsList.forEach((item) => {
        item.style.transform = startTranslateX;
    })


    setTimeout(() => {
        // анимация, перемещение карточек в нужную сторону
        allCardsList.forEach((item) => {
            item.style.transition = 'all 0.5s';
            item.style.transform = animationTranslateX;
        })

        allCardsList[allCardsList.length - 1].addEventListener('transitionend', () => {
            // убираем транзишн для незаметного изменения смены классов и положения
            allCardsList.forEach((item) => {
                item.style.transition = '';
                item.style.transform = endTranslateX;
            })

            deletePetsCards(newPosition);

            newEl.classList.remove(`${position}`);
            newEl.classList.add('curr');
            currEl.classList.remove('curr');
            currEl.classList.add(`${newPosition}`);

            // включаем кнопки
            btnDisabled(false)
        }, {once: true});
    }, 100)


    // обновляем переменные с индексами
    if (position === 'next') {
        previousCardsIndex = [...currentCardsIndex];
        currentCardsIndex = [...nextCardsIndex];
        nextCardsIndex = [];
    } else {
        nextCardsIndex = [...currentCardsIndex];
        currentCardsIndex = [...previousCardsIndex];
        previousCardsIndex = [];
    }
}

function keyMove(e) {
    if (e.key === 'ArrowLeft' && btnLeft.disabled === false && btnRight.disabled === false) {
        showPrevCards()
    } else if (e.key === 'ArrowRight' && btnLeft.disabled === false && btnRight.disabled === false) {
        showNextCards()
    }
}

/**
 * Запускает работу бесконечного слайдера-карусели
 */
export function sliderCarousel() {
    petsArr = Array.from({length: 8}, (_, i) => i)
    shuffleArray(petsArr)

    // определяем количество карточек
    checkScreenWidth()

    // создаем первые карточки
    for (let i = 0; i < numOfCards; i++) {
        currentCardsIndex.push(petsArr.pop());
    }
    createPetsCards(currentCardsIndex, 'curr')


    // связываем функцию с направлением для передачи в EventListener
    showPrevCards = showNewCards.bind('prev');
    showNextCards = showNewCards.bind('next');

    // прослушиватели событий
    window.addEventListener('resize', checkScreenWidth)
    btnLeft.addEventListener("click", showPrevCards)
    btnRight.addEventListener("click", showNextCards)
    document.addEventListener('keydown', keyMove);
}
