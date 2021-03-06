import {getFromStorage, setToStorage} from './storage';
import {checkContent, renderEvents, addNewEventInRender, makeSort} from './render';
import {EventEntry} from './eventEntry'

const dateValue = document.getElementById('date-value'); //поле ввода даты события
const nameValue = document.getElementById('name-value'); //поле ввода имени события
const timeValue = document.getElementById('input-time'); //поле ввода времени
const makeDate = document.getElementById('take-date'); //кнопка Пуск
const dateResult = document.getElementById('date-result'); //сюда добавляем таймеры
const checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени
const checkboxSort = document.getElementById('sort'); //чекбокс, отображения\скрытия времени



checkboxTime.onchange = (event) => {
    //происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
    event.target.checked === false ? timeValue.classList.add('hidden') : timeValue.classList.remove('hidden');
};

checkContent(makeDate, dateValue, nameValue);

renderEvents(getFromStorage('events'), dateResult);

checkboxSort.checked=getFromStorage('sort');


checkboxSort.addEventListener('click', () => makeSort(dateResult) );

makeDate.addEventListener("click", () => {
    addNewEventInRender(dateResult, new EventEntry(nameValue.value, dateValue.value, timeValue.value));
    dateValue.value = '';
    nameValue.value = '';
    timeValue.value = '';
    makeDate.disabled = true;
});