import {setToStorage, addToStorage, getEventFromStorage} from './storage';
import {checkContent, renderEvents, addNewEventInRender} from './render';
import {Event} from './event'

const dateValue = document.getElementById('date-value'); //поле ввода даты события
const nameValue = document.getElementById('name-value'); //поле ввода имени события
const timeValue = document.getElementById('input-time'); //поле ввода времени
const makeDate = document.getElementById('take-date'); //кнопка Пуск
const dateResult = document.getElementById('date-result'); //сюда добавляем таймеры
const info = document.getElementById('info'); //место, куда можно выводить информационные сообщения
const checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени

let interval; //переменная в общем поле видимости, которая позволит очистить интервал 
checkboxTime.onchange = (event) => {
    //происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
    event.target.checked === false ? timeValue.classList.add('hidden') : timeValue.classList.remove('hidden');
};

checkContent(makeDate, dateValue, nameValue);

if (localStorage === null) {
    setToStorage('events', [new Event('Новый год', '2020-12-31')]);
    addToStorage('events', new Event('Начало летa', '2020-06-01', '11:30:30'));
}
if (localStorage.length === 0) {
    setToStorage('events', [new Event('Новый год', '2020-12-31')]);
    addToStorage('events', new Event('Начало летa', '2020-06-01', '11:30:30'));
    addToStorage('events', new Event('8 мая 11:30', '2020-05-08', '11:30:30'));
}

renderEvents(getEventFromStorage('events'), dateResult, interval);

makeDate.onclick = () => {
    addNewEventInRender(dateResult, interval, new Event(nameValue.value, dateValue.value, timeValue.value));
    dateValue.value = '';
    nameValue.value = '';
    timeValue.value = '';
    makeDate.disabled = true;
};

// deleteEventFromRender(dateResult, interval, 'events',1)

