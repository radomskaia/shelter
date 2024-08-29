export const pets = [
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


/**
 * Современный алгоритм тасования Фишера — Йетса для тасования массива a из n элементов (индексы 0..n-1):
 *     для всех i от n − 1 до 1 выполнить:
 *     j ← случайное число 0 ≤ j ≤ i
 *     обменять местами a[j] и a[i]
 *
 * @param {*[]} arr array of your numbers
 * @param start array shuffle start index
 * @param end array shuffle end index
 */
export function shuffleArray(arr, start = 0, end = arr.length) {
    for (let i = end - 1; i > start; i--) {
        let j = Math.round(Math.random() * (i - start)) + start;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

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

export function createPetsCards(indexArr, position) {
    const cardsList = document.querySelector(`.${position}`);
    indexArr.forEach((petIndex) => {
        const petCard = document.createElement('li')
        petCard.classList.add("card-item", 'page1')
        petCard.setAttribute('data-index', petIndex)
        petCard.innerHTML = `<img class="card_img" src="${pets[petIndex].img}" alt="Photo of pet">
                        <h4 class="header_4">${pets[petIndex].name}</h4>
                        <button class="pets_btn">Learn more</button>`
        cardsList.append(petCard)
    })
}

export function pagination() {
    const pageBtn = document.querySelector(".page_number");
    const dabbleLeftArrowBtn = document.querySelector(".dabble_left_arrow");
    const dabbleRightArrowBtn = document.querySelector(".dabble_right_arrow");
    const leftArrowBtn = document.querySelector(".left_arrow");
    const rightArrowBtn = document.querySelector(".right_arrow");
    const petsArr = createArrayWithUniqueNumbers()
    sortArrayWithUniqueNumbers(petsArr)
    let numOfCards, screenWidth, offset, page;


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

    function getCardsForPage() {
        // e.preventDefault();
        if (this === 'next') offset += numOfCards;
        if (this === 'prev') offset -= numOfCards;
        if (this === 'curr') {

            offset -= offset % numOfCards;
            if (offset === 0) {
                offset = numOfCards;
            }

        }
        // console.log('Offset before width change', offset)
        if (this === 'first') offset = numOfCards;
        if (this === 'last') offset = petsArr.length;
        // console.log('Offset after width change', offset)

        document.querySelector('.pets-page').innerHTML = '';
        const indexArr = petsArr.slice((offset - numOfCards), offset);
        createPetsCards(indexArr, 'pets-page');
        page = offset / numOfCards;
        pageBtn.textContent = `${page}`;

        if (offset === numOfCards) {
            // console.log('Offset in left', offset)
            leftArrowBtn.disabled = true;
            dabbleLeftArrowBtn.disabled = true;
            rightArrowBtn.disabled = false;
            dabbleRightArrowBtn.disabled = false;
        } else if (offset > numOfCards && offset < petsArr.length) {
            leftArrowBtn.disabled = false;
            dabbleLeftArrowBtn.disabled = false;
            rightArrowBtn.disabled = false;
            dabbleRightArrowBtn.disabled = false;
        } else {
            // console.log('Offset in right', offset)
            dabbleRightArrowBtn.disabled = true;
            rightArrowBtn.disabled = true;
            leftArrowBtn.disabled = false;
            dabbleLeftArrowBtn.disabled = false;
        }


    }


    checkScreenWidth()
    getCardsForPage.bind('curr')()

    window.addEventListener('resize', checkScreenWidth)
    leftArrowBtn.addEventListener('click', getCardsForPage.bind('prev'))
    rightArrowBtn.addEventListener('click', getCardsForPage.bind('next'))
    dabbleLeftArrowBtn.addEventListener('click', getCardsForPage.bind('first'))
    dabbleRightArrowBtn.addEventListener('click', getCardsForPage.bind('last'))
}

