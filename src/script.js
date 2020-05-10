const c = console.log;

const dateValue = document.getElementById('date-value'); //поле ввода даты события
const nameValue = document.getElementById('name-value'); //поле ввода имени события
const timeValue = document.getElementById('input-time'); //поле ввода времени
const makeDate = document.getElementById('take-date'); //кнопка Пуск
const dateResult = document.getElementById('date-result'); //сюда добавляем таймеры
const info = document.getElementById('info'); //место, куда можно выводить информационные сообщения
const checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени

let interval; //переменная в общем поле видимости, которая позволит очистить интервал 

//делает информационное сообщение на заданое кол-во мс
const makeInfoMessage = (message, delay) => {
    info.innerHTML += `<div><b> ${message} </b></div>`;
    setTimeout(() => info.innerHTML = null, delay)
};
//происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
checkboxTime.onchange = (event) => {
    event.target.checked === false ? timeValue.classList.add('hidden') : timeValue.classList.remove('hidden');
};
//функция для разблокировки кнопки Пуск, когда ввели Дату и Имя события
const checkContent = (...args) => {
    args.forEach(arg => {
        arg.oninput = () => {
            if (dateValue.value.length && nameValue.value.length) {
                makeDate.disabled = false;
            }
        }
    })
};
checkContent(dateValue, nameValue);

const timeFormatter = (date) => {
    const ms = Number(date);
    let delta = Math.abs(date) / 1000; //переводит дату в секунды
    const years = Math.floor(delta / 31536000); //сколько лет влазит в это кол-во секунд
    delta -= years * 31536000; //получаем остаток секунд, вычитая из него кол-во милисекунд в целых годах
    const months = Math.floor(delta / 2592000); //сколько месяцев влазит в остаток милисекунд после подсчёта Года
    delta -= months * 2592000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = Math.floor(delta % 60);
    return {
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        ms: ms
    }
};

class Event {
    constructor(name, date, time) {
        this._id = Event.counter;
        this.name = name;
        this.newDate = new Date(`${date}T${time || '00:00:00'}`)
    }

  static get counter() { //счётчик для id
    Event._counter = getEventFromStorage('events') ? getEventFromStorage('events').length + 1 : 1;
    return Event._counter;
  }
}

const setToStorage = (key, arrWithItems) => localStorage.setItem(key, JSON.stringify(arrWithItems));
const addToStorage = (key, item) => setToStorage(key, [...getEventFromStorage(key), item]);
const getEventFromStorage = (key) => JSON.parse(localStorage.getItem(key));
// localStorage.clear()
// если localstorage пуст (запустили первый раз. то внесём в него 3 события)
if (localStorage.length === 0) {
  setToStorage('events', [new Event('Новый год', '2020-12-31')]);
  addToStorage('events', new Event('Начало летa', '2020-06-01', '11:30:30'));
  addToStorage('events', new Event('8 мая 11:30', '2020-05-08', '11:30:30'));
}

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
const renderEvents = (arr) => {
    console.log(arr);
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

            dateResult.appendChild(arrForTeg[idx]); //вставляем на страницу
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
const addNewEventInRender = (event) => {
    addToStorage('events', event)
    dateResult.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage('events')); //снова отрендерили это всё
};
renderEvents(getEventFromStorage('events'));

const deleteEventFromRender = (key, id) => {
    setToStorage(
        key,
        getEventFromStorage(key).filter(item => item._id !== id)
    );
    dateResult.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage(key));
};
// deleteEventFromRender('events',3);

makeDate.onclick = () => {
    addNewEventInRender(new Event(nameValue.value, dateValue.value, timeValue.value));
    dateValue.value = '';
    nameValue.value = '';
    timeValue.value = '';
    makeDate.disabled = true;
};