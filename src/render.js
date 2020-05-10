import {timeFormatter} from './event'
import {getEventFromStorage, addToStorage, setToStorage} from './storage'



//делает информационное сообщение на заданое кол-во мс
const makeInfoMessage = (message, delay, target) => {
    // info.innerHTML += `<div><b> ${message} </b></div>`;
    // setTimeout(() => info.innerHTML = null, delay);
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



const renderEventTemplate = (nameEvent, eventDifference, isPresent) => {
    return `
  <b>Событие:</b> ${nameEvent}. 
  <b>${isPresent ? ' До него:' : 'C тех пор прошло:'}</b>   
  ${eventDifference.years !== 0 ? eventDifference.years + ' лет,' : ''}  
  ${eventDifference.months !== 0 ? eventDifference.months + ' месяцев,' : ''} 
  ${eventDifference.days !== 0 ? eventDifference.days + ' дней,' : ''} 
  ${eventDifference.hours !== 0 ? eventDifference.hours + ' часов,' : ''} 
  ${eventDifference.minutes + ' минут,'} 
  ${eventDifference.seconds + ' секунд'} 
  `;
};

export const renderEvents = (arr, target, interval) => {
    // console.log(arr);
    if (arr.length === 0) makeInfoMessage('Список событий пуст', 60000)
    else {
        let arrForTeg = []; //массив, где будут лежать результаты createElement

        arr.forEach((event, idx) => {
            arrForTeg.push(document.createElement('p')); //создаём для каждого элемента массива тэг
            let itemDifference = timeFormatter(new Date(event.newDate) - new Date()); //каждую секунду пересчитывается разница во времени между заданной датой и нынешней

            //для каждого созданного тега делаем текстовое содержимое
            if (itemDifference.ms > 0) arrForTeg[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true);
            //если таймер кончился
            if (itemDifference.ms <= 0) arrForTeg[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false);

            target.appendChild(arrForTeg[idx]); //вставляем на страницу
        });
        //каждую секунду для каждого эл-та понижаем кол-во милисекунд на 1000
        interval = setInterval(
            () => {
                arr.forEach((event, idx) => {
                    let itemDifference = timeFormatter((new Date(event.newDate) - 1000) - new Date());

                    // event.difference = countDownTimer(event.difference.ms); //вычитаем 1000 милисекунд и возвращаем новое отформатированное значение
                    if (itemDifference.ms > 0) arrForTeg[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true);
                    //если таймер кончился
                    if (itemDifference.ms <= 0) arrForTeg[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false);
                })
                // console.log('интервал сработал')
            }, 1000
        )
    }
};

export const addNewEventInRender = (outputField, interval, event) => {
    addToStorage('events', event)
    outputField.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage('events'), outputField, interval); //снова отрендерили это всё
};


export const deleteEventFromRender = (outputField, interval, key, id) => {
    setToStorage(
        key,
        getEventFromStorage(key).filter(item => item._id !== id)
    );
    outputField.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage(key), outputField, interval);
};
// deleteEventFromRender('events',3);