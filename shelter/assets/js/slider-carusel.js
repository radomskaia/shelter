import {createPetsCards, shuffleArray} from "./pagination.js";

export function sliderCarousel() {
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
