import {timeFormatter} from './eventEntry'
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

const addButton = (id, target, interval) => {
    let buttonDelete = document.createElement('button');
    buttonDelete.id= id;
    buttonDelete.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'mt-2');
    buttonDelete.innerHTML= `&#10008`;
    buttonDelete.addEventListener('click', () => deleteEventFromRender(target, interval,'events',  id));
    return buttonDelete;
};

export const renderEvents = (arr, target, interval) => {
    // console.log(arr);
    if (arr.length === 0) makeInfoMessage('Список событий пуст', 4000, target);
    else {
        let arrForTegWrapper = []; //создаём тэг для каждой обёртки события
        let arrForTegWithContent = []; //создаём тэк для каждого содержимого с изменющейся информации о событии

        arr.forEach((event, idx) => {
            arrForTegWrapper.push(document.createElement('div'));
            arrForTegWithContent.push(document.createElement('span'));

            let itemDifference = timeFormatter(new Date(event.newDate) - new Date()); //разница во времени между заданной датой и нынешней

            if (itemDifference.ms > 0) arrForTegWithContent[idx].innerHTML=renderEventTemplate(event.name, itemDifference, true); //для каждого созданного тега делаем  содержимое
            if (itemDifference.ms <= 0) arrForTegWithContent[idx].innerHTML=renderEventTemplate(event.name, itemDifference, false); //если таймер кончился

            arrForTegWrapper[idx].appendChild(arrForTegWithContent[idx]); //добавляем в обёртку события контент
            arrForTegWrapper[idx].appendChild(addButton(event._id, target, interval)); //добавляем в обёртку события кнопку

            target.appendChild(arrForTegWrapper[idx]); //вставляем на страницу
        });

        //каждую секунду для каждого эл-та понижаем кол-во милисекунд на 1000
        interval = setInterval(() => {
            arr.forEach((event, idx) => {
                let itemDifference = timeFormatter(new Date(event.newDate) - 1000 - new Date()); //каждую секунду вычитаем из имеющеся даты 1000мс

                if (itemDifference.ms > 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true);
                //если таймер кончился
                if (itemDifference.ms <= 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false);
            });
            // console.log('интервал сработал')
        }, 1000);
    }
};

export const addNewEventInRender = (outputField, interval, event) => {
    addToStorage('events', event);
    outputField.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage('events'), outputField, interval); //снова отрендерили это всё
};


export const deleteEventFromRender = (target, interval, key, id) => {
    setToStorage(
        key,
        getEventFromStorage(key).filter((item) => item._id !== id)
    );
    target.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage(key), target, interval);
};