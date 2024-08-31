import {pets} from './utils.js';

// объявление глобальных переменных
const modalWindowBox = document.querySelector('.modal-window-box');
const btnModal = document.querySelector('.btn_modal');


function openModal(e) {
    const petsAge = document.querySelector('.pets-age');
    const petsImg = document.querySelector('.modal-img');
    const petsName = document.querySelector('.pets-name');
    const petsType = document.querySelector('.pets-type');
    const petsDescription = document.querySelector('.pets-description');
    const petsInoculations = document.querySelector('.pets-inoculations');
    const petsDiseases = document.querySelector('.pets-diseases');
    const petsParasites = document.querySelector('.pets-parasites');

    // определяем, был ли клик именно по карточке
    const petCard = e.target.closest('.card-item')
    if (petCard) {
        const petIndex = petCard.getAttribute('data-index');

        // заполняем модальное окно
        petsImg.src = `${pets[petIndex].img}`;
        petsName.textContent = `${pets[petIndex].name}`;
        petsType.textContent = `${pets[petIndex].type} - ${pets[petIndex].breed}`;
        petsDescription.textContent = `${pets[petIndex].description}`;
        petsAge.textContent = `${pets[petIndex].age}`;
        petsInoculations.textContent = `${pets[petIndex].inoculations.join(', ')}`;
        petsDiseases.textContent = `${pets[petIndex].diseases}`;
        petsParasites.textContent = `${pets[petIndex].parasites}`;

        // открываем окно
        modalWindowBox.classList.add('modal-window-box__active');

        // убираем скролл
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(e) {
    // закрываем окно
    if (e.target.closest('.modal-window') && e.target.closest('.btn_modal') !== btnModal) return;
    modalWindowBox.classList.remove('modal-window-box__active');

     // возвращаем скролл
    document.body.style.overflow = '';
}

export function modalWindow(page) {
    let petsCardsBox;
    // определяем контейнер с карточками
    if (page === 'main') {
        petsCardsBox = document.querySelector('.cards-list-box');
    } else {
        petsCardsBox = document.querySelector('.pets-page');
    }

    // прослушиватели событий
    petsCardsBox.addEventListener('click', openModal);
    btnModal.addEventListener('click', closeModal);
    modalWindowBox.addEventListener('click', closeModal);
}
