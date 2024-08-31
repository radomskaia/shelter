import {createPetsCards, shuffleArray, deletePetsCards} from "./utils.js";

//объявление глобальных переменных
const pageBtn = document.querySelector(".page_number");
const dabbleLeftArrowBtn = document.querySelector(".dabble_left_arrow");
const dabbleRightArrowBtn = document.querySelector(".dabble_right_arrow");
const leftArrowBtn = document.querySelector(".left_arrow");
const rightArrowBtn = document.querySelector(".right_arrow");
let numOfCards, screenWidth, offset, page;

// создание, сортировка массива из 48 карточек
const petsArr = createArrayWithUniqueNumbers()
sortArrayWithUniqueNumbers(petsArr)

/**
 * Проверяет массив на уникальность элементов, сравнивает с предыдущим массивом если это необходимо
 * @param {*[]} arr array of your numbers
 * @param previousArr array for comparison
 */
function isUniqueArray(arr, previousArr = []) {
    const currentSet = new Set(arr);
    if (currentSet.size !== arr.length) return false;
    if (previousArr.length > 0) {
        for (let num of currentSet) {
            if (previousArr.includes(num)) return false
        }
    }
    return true
}

/**
 * Принимает массив уникальных чисел для создания перетасованного массива с необходимым количеством повторений
 * @param {*[]} numsArray array of unique numbers of the required length
 * @param count number of repetitions of numbers in an array
 */
function createArrayWithUniqueNumbers(numsArray = Array.from({length: 8}, (_, i) => i), count = 6) {
    let result = []
    for (let i = 0; i < count; i++) {
        let shuffled = numsArray.slice();
        shuffleArray(shuffled);
        result = result.concat(shuffled)
    }
    return result;
}

/**
 * Сортировка массива с уже заданной уникальной последовательностью чисел, чтобы в каждой группе элементов не было
 * повторяющихся значений, с учетом заданного количества уникальных чисел, сохранив первоначальную уникальность
 * @param {*[]} numsArray array of your numbers with Exist unique numbers
 * @param required length of the required sequence of unique numbers
 * @param exist length of the current sequence of unique numbers that already exist in the array being
 * checked
 */
function sortArrayWithUniqueNumbers(numsArray, required = 6, exist = 8) {
    for (let i = 0; i < numsArray.length; i += required) {
        const startIndexForExistNum = (i + exist) - ((i + exist) % exist);
        if (!isUniqueArray(numsArray.slice(i, i + required))) {
            shuffleArray(numsArray, startIndexForExistNum, startIndexForExistNum + exist)
            i -= 6;
        }
    }
}

/**
 * Определение количество карточек, отображаемых на экране.
 * Добавление/ удаление карточек при изменении ширины экрана.
 */
function checkScreenWidth() {
    screenWidth = document.documentElement.clientWidth;
    if (screenWidth > 1217) {
        if (numOfCards !== 8) {
            numOfCards = 8;
            offset = offset ? offset : numOfCards;
            getCardsForPage.bind('curr')()
        }
    }
    if (screenWidth <= 1217 && screenWidth > 576) {
        if (numOfCards !== 6) {
            numOfCards = 6;
            offset = offset ? offset : numOfCards;
            getCardsForPage.bind('curr')()
        }
    }
    if (screenWidth <= 576) {
        if (numOfCards !== 3) {
            numOfCards = 3;
            offset = offset ? offset : numOfCards;
            getCardsForPage.bind('curr')()
        }
    }
}

function leftArrowsDisabled(bool) {
    leftArrowBtn.disabled = bool;
    dabbleLeftArrowBtn.disabled = bool;
}

function rightArrowsDisabled(bool) {
    dabbleRightArrowBtn.disabled = bool;
    rightArrowBtn.disabled = bool;
}

/**
 * @param position может иметь значение 'next', 'prev', 'curr', 'first' или 'last'.
 * Создает и показывает необходимое количество карточек, обновляет нумерацию страницы.
 */
function getCardsForPage() {
    // определяем офсет пагинации
    if (this === 'next') offset += numOfCards;
    if (this === 'prev') offset -= numOfCards;
    if (this === 'curr') {
        offset -= offset % numOfCards;
        if (offset === 0) {
            offset = numOfCards;
        }
    }
    if (this === 'first') offset = numOfCards;
    if (this === 'last') offset = petsArr.length;

    deletePetsCards('pets-page');

    // определяем индексы отображаемых карточек и номер страницы
    const indexArr = petsArr.slice((offset - numOfCards), offset);
    createPetsCards(indexArr, 'pets-page', false);
    page = offset / numOfCards;
    pageBtn.textContent = `${page}`;

    // включаем/выключаем кнопки на крайних страницах
    if (offset === numOfCards) {
        leftArrowsDisabled(true);
        rightArrowsDisabled(false);
    } else if (offset > numOfCards && offset < petsArr.length) {
        leftArrowsDisabled(false);
        rightArrowsDisabled(false);
    } else {
        rightArrowsDisabled(true);
        leftArrowsDisabled(false);
    }
}

/**
 * Запускает работу пагинации
 */
export function pagination() {
    // инициализация
    checkScreenWidth()
    getCardsForPage.bind('curr')()

    // прослушиватели событий
    window.addEventListener('resize', checkScreenWidth)
    leftArrowBtn.addEventListener('click', getCardsForPage.bind('prev'))
    rightArrowBtn.addEventListener('click', getCardsForPage.bind('next'))
    dabbleLeftArrowBtn.addEventListener('click', getCardsForPage.bind('first'))
    dabbleRightArrowBtn.addEventListener('click', getCardsForPage.bind('last'))
}

