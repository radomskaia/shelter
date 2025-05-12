// объект из которого надо создать карточки
export const pets = [
    {
        "name": "Jennifer",
        "img": "assets/img/pets_500px/jennifer.webp",
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
        "img": "assets/img/pets_500px/sophia.webp",
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
        "img": "assets/img/pets_500px/woody.webp",
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
        "img": "assets/img/pets_500px/scarlett.webp",
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
        "img": "assets/img/pets_500px/katrine.webp",
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
        "img": "assets/img/pets_500px/timmy.webp",
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
        "img": "assets/img/pets_500px/freddie.webp",
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
        "img": "assets/img/pets_500px/charly.webp",
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
 * Создает карточки для пагинации и слайдера-карусели
 * @param {*[]} indexArr массив индексов для создания карточек
 * @param {string} position класс для списка .cards-list который необходимо создать
 * @param newList по умолчанию true - карточки создаются со списком .cards-list; false - карточки добавляются в .cards-list
 */
export function createPetsCards(indexArr, position, newList = true) {
    const createOneCard = (index) => {
        const petCard = document.createElement('li')
        petCard.classList.add("card-item")
        petCard.setAttribute('data-index', index)
        petCard.innerHTML = `<img class="card_img" src="${pets[index].img}" alt="Photo of pet">
                        <h4 class="header_4">${pets[index].name}</h4>
                        <button class="pets_btn">Learn more</button>`
        return petCard;
    }
    if (newList) {
        const cardsList = document.createElement('ul');
        cardsList.classList.add('cards-list', 'flex', `${position}`);
        const cardListBox = document.querySelector('.cards-list-box')
        cardListBox.append(cardsList)
        indexArr.forEach((petIndex) => cardsList.append(createOneCard(petIndex)))
    } else {
        const cardsList = document.querySelector(`.${position}`);
        indexArr.forEach((petIndex) => cardsList.append(createOneCard(petIndex)))
    }
}

/**
 * Удаляет карточки для пагинации и слайдера-карусели
 * @param {string} position класс, из которого надо удалить карточки / сам класс
 */
export function deletePetsCards(position) {
    if (position === 'pets-page') {
        document.querySelector('.pets-page').innerHTML = '';
    } else {
        const element = document.querySelector(`.${position}`)
        if (!element) return
        element.remove()
    }
}
