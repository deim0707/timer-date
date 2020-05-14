import {timeFormatter} from './eventEntry'
import {getEventFromStorage, addToStorage, setToStorage} from './storage'

let interval; //переменная в общем поле видимости, которая позволит очистить интервал

//делает информационное сообщение на заданое кол-во мс
const makeInfoMessage = (message, delay, target) => {
    target.innerHTML += `<div><b> ${message} </b></div>`;
    setTimeout(() => target.innerHTML = null, delay);
};
//функция для разблокировки кнопки Пуск, когда ввели Дату и Имя события
export const checkContent = (target, ...args) => {
    args.forEach(arg => {
        arg.oninput = () => {
            if (args[0].value.length && args[1].value.length) {
                target.disabled = false;
            }
        }
    })
};

const wordForm = (num, word) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${num} ${word[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]]}`;
};

const renderEventTemplate = (nameEvent, eventDifference, isPresent) => {
    return `
  <b>Событие:</b> ${nameEvent}. 
  <b>${isPresent ? ' До него:' : 'C тех пор прошло:'}</b>   
  ${eventDifference.years !== 0 ? wordForm(eventDifference.years, ['год,', 'года,', 'лет,']) : ''}  
  ${eventDifference.months !== 0 ? wordForm(eventDifference.months, ['месяц,', 'месяца,', 'месяцев,']) : ''} 
  ${eventDifference.days !== 0 ? wordForm(eventDifference.days, ['день,', 'дня,', 'дней,']) : ''} 
  ${eventDifference.hours !== 0 ? wordForm(eventDifference.hours, ['час,', 'часа,', 'часов,']) : ''} 
  ${wordForm(eventDifference.minutes, ['минута,', 'минуты,', 'минут,'])} 
  ${wordForm(eventDifference.seconds, ['секунда', 'секунды', 'секунд'])} 
  `;
};

const addButton = (id, target, event) => {
    let wrapperForButtons = document.createElement('div');

    let buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'mt-2');
    buttonDelete.title = 'Удалить';
    buttonDelete.innerHTML = `&#10008`;
    buttonDelete.addEventListener('click', () => deleteEventFromRender(target, 'events', id));

    let buttonPause = document.createElement('button');
    buttonPause.classList.add('btn', 'btn-sm', 'mt-2', 'mr-2', 'flex-shrink-0');
    event.pause === true ? buttonPause.classList.add('btn-info') : buttonPause.classList.add('btn-outline-info');
    buttonPause.title = 'Пауза отображения отсчёта счётчика';
    buttonPause.innerHTML = `<b>||</b>`;
    buttonPause.addEventListener('click', () => pauseEvent(target, 'events', id));


    wrapperForButtons.appendChild(buttonPause);
    wrapperForButtons.appendChild(buttonDelete);
    return wrapperForButtons;
};

export const renderEvents = (arr, target ) => {
    // console.log(arr);
    if (arr.length === 0) makeInfoMessage('Список событий пуст', 4000, target);
    else {
        let arrForTegWrapper = []; //создаём тэг для каждой обёртки события
        let arrForTegWithContent = []; //создаём тэк для каждого содержимого с изменющейся информации о событии

        arr.forEach((event, idx) => {
            arrForTegWrapper.push(document.createElement('div'));
            arrForTegWithContent.push(document.createElement('span'));

            let itemDifference = timeFormatter(new Date(event.newDate) - new Date()); //разница во времени между заданной датой и нынешней

            if (itemDifference.ms > 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true); //для каждого созданного тега делаем  содержимое
            if (itemDifference.ms <= 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false); //если таймер кончился

            arrForTegWrapper[idx].appendChild(arrForTegWithContent[idx]); //добавляем в обёртку события контент
            arrForTegWrapper[idx].appendChild(addButton(event._id, target, event)); //добавляем в обёртку события кнопку

            target.appendChild(arrForTegWrapper[idx]); //вставляем на страницу
        });

        //каждую секунду для каждого эл-та понижаем кол-во милисекунд на 1000
        interval = setInterval(() => {
            arr.forEach((event, idx) => {
                if (event.pause === true) return; //если событие поставленно на паузу, то приостанавливаем обновление

                let itemDifference = timeFormatter(new Date(event.newDate) - 1000 - new Date()); //каждую секунду вычитаем из имеющеся даты 1000мс

                if (itemDifference.ms > 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true);
                //если таймер кончился
                if (itemDifference.ms <= 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false);
            });
            // console.log('интервал сработал')
        }, 1000);
    }
};

export const addNewEventInRender = (target, event) => {
    addToStorage('events', event);
    target.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage('events'), target); //снова отрендерили это всё
};


const deleteEventFromRender = (target, key, id) => {
    setToStorage(
        key,
        getEventFromStorage(key).filter((item) => item._id !== id)
    );
    target.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage(key), target, interval);
};

const pauseEvent = (target, key, id) => {
    let arr = getEventFromStorage(key);
    arr.forEach(item => {
        if (item._id === id) item.pause = item.pause !== true;
    });
    setToStorage(key, arr);

    target.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage(key), target, interval);
};

