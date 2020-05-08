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
  info.innerHTML+=`<div><b> ${message} </b></div>`;
  setTimeout( () => info.innerHTML=null, delay)
}

//функция для разблокировки кнопки Пуск, когда ввели Дату и Имя события
const checkContent = (...args) => {
  args.forEach( arg =>{
    arg.oninput = () => {
      if(dateValue.value.length && nameValue.value.length) {
        makeDate.disabled = false;
      }
    }
  })
}
checkContent(dateValue, nameValue);

//происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
checkboxTime.onchange = (event) => {
  event.target.checked === false ? timeValue.classList.add('hidden') : timeValue.classList.remove('hidden');
}

class EventHelpers {
  //приводит дату к годам, месяцам, дням, минутам, секундам
  timeFormatter = (date) => {
    const ms = date;
    let delta = Math.abs(date) / 1000; //переводит дату в секунды
    const years = Math.floor(delta / 31536000); //сколько лет влазит в это кол-во секунд
    delta -= years * 31536000; //получаем остаток секунд, вычитая из него кол-во милисекунд в целых годах
    const mounths = Math.floor(delta / 2592000); //сколько месяцев влазит в остаток милисекунд после подсчёта Года
    delta -= mounths * 2592000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = Math.floor(delta % 60);  
    return { 
      years: years,
      mounths: mounths,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      ms: ms
    }
  }
  //таймер обратного отсчёта даты
  countDownTimer = (date) => {
    return this.timeFormatter(date-1000)
  }
}

class Event extends EventHelpers {
  constructor (name, date, time) {
    super();
    this._id = Event.counter;
    this.name = name;
    this.newDate = new Date(`${date}T${time || '00:00:01'}`)
    this.dateNow = new Date();
    this.difference = this.timeFormatter(this.newDate-this.dateNow); //рассчитали разницу между датами в днях
  }
  
  static get counter() { //счётчик для id
    Event._counter = (Event._counter || 0) + 1;
    return Event._counter;
  }
}

let events = [
  new Event('Новый год', '2020-12-31'),
  new Event('Начало летa', '2020-06-01', '11:30:30'),
  new Event('8 мая 11:30', '2020-05-08', '11:30:30'),
];
////////
localStorage.setItem('test', 1);

/////////


// const deleteItem = (itemIndex) => {
//   events.splice(itemIndex, 1)
// }

const renderEventTemplate = (event, tense) => {
  if (tense === 'present') {
    return `
    <b>Событие:</b> ${event.name}. 
    <b>До него:</b>  
    ${event.difference.years !== 0 ? event.difference.years + ' лет,' : ''}  
    ${event.difference.mounths !==0 ? event.difference.mounths + ' месяцев,' : ''} 
    ${event.difference.days !==0 ? event.difference.days + ' дней,' : ''} 
    ${event.difference.hours !==0 ? event.difference.hours + ' часов,' : ''} 
    ${event.difference.minutes !==0 ? event.difference.minutes + ' минут,' : ''} 
    ${event.difference.seconds !==0 ? event.difference.seconds + ' секунд' : ''} 
    `;
  }

  if (tense === 'future') {
    return `
    <b>Событие</b> ${event.name} <b>достигнуто!</b>
    <b> C тех пор прошло: </b>
    ${event.difference.years !== 0 ? event.difference.years + ' лет,' : ''}  
    ${event.difference.mounths !==0 ? event.difference.mounths + ' месяцев,' : ''} 
    ${event.difference.days !==0 ? event.difference.days + ' дней,' : ''} 
    ${event.difference.hours !==0 ? event.difference.hours + ' часов,' : ''} 
    ${event.difference.minutes !==0 ? event.difference.minutes + ' минут,' : ''} 
    ${event.difference.seconds !==0 ? event.difference.seconds + ' секунд' : ''} 
    `;
  }
}

const renderEvents = (arr) => {
  if (arr.length === 0) makeInfoMessage('Список событий пуст', 60000)

  else {
    let arrForDiv = []; //массив, где будут лежать результаты createElement

    arr.forEach( (event, idx) => {
      arrForDiv.push(document.createElement('p')); //создаём для каждого элемента массива тэг
      //для каждого созданного тега делаем текстовое содержимое
      if (arr[idx].difference.ms > 0 ) {
        arrForDiv[idx].innerHTML = renderEventTemplate(arr[idx], 'present');
      }
      //если таймер кончился
      if(arr[idx].difference.ms <= 0) {
        arrForDiv[idx].innerHTML = arrForDiv[idx].innerHTML = renderEventTemplate(arr[idx], 'future');
      }

      dateResult.appendChild(arrForDiv[idx]); //вставляем на страницу

    })
    //каждую секунду для каждого эл-та понижаем кол-во милисекунд на 1000
    interval = setInterval(
      () => {
        arr.forEach((event, idx)=> {
          event.difference=event.countDownTimer(event.difference.ms); //вычитаем 1000 милисекунд и возвращаем новое отформатированное значение
          if(arrForDiv[idx]) {
            arrForDiv[idx].innerHTML = arrForDiv[idx].innerHTML = renderEventTemplate(arr[idx], 'present');
          }
          //если таймер кончился
          if(arr[idx].difference.ms <= 0) {
            arrForDiv[idx].innerHTML = arrForDiv[idx].innerHTML = renderEventTemplate(arr[idx], 'future');
          }
        })
      }, 1000
    )

  }
}

const addNewEventInArray = (arr, event) => {
  arr.push(event); //запушили в старый массив новый элемент\событие
  dateResult.textContent=null; //обнулили всё, что отображалось до этого
  clearTimeout(interval)
  renderEvents(arr); //снова отрендерили это всё
}

renderEvents(events)

makeDate.onclick = () => {
  addNewEventInArray(events, new Event(nameValue.value, dateValue.value, timeValue.value))
  
  // dateValue.value = null; //обнуляем значение поле поссле нажатия на кнопку
  // timeValue.value = null;
  // nameValue.value = null;
  // makeDate.disabled = true;
}
