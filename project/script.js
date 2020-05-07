const c = console.log;

const dateValue = document.getElementById('date-value'); //поле ввода даты
const takeDate = document.getElementById('take-date'); //кнопка получить дату
const dateResult = document.getElementById('date-result'); //блок с разницей по дням
const noDate = document.getElementById('no-date'); //сюда запишется сообщение о необходимости ввести дату
const checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени
const timeValue = document.getElementById('input-time'); //поле ввода времени


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
  constructor (date, time) {
    super();
    this._id = Event.counter;
    this.newDate = new Date(`${date}T${time || '00:00:01'}`)
    this.dateNow = new Date();
    this.difference = this.timeFormatter(this.newDate-this.dateNow); //рассчитали разницу между датами в днях
  }

  static get counter() { //счётчик для id
    Event._counter = (Event._counter || 0) + 1;
    return Event._counter;
  }
}


// takeDate.onclick = () => {
//   if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
//   else {
//     const newTimer = new Event(dateValue.value, timeValue.value);
//     renderEvent(newTimer);
//     dateValue.value = ''; //обнуляем значение поле поссле нажатия на кнопку
//     timeValue.value = '';
//   }
// }

const addEvents = () => {
  
}


let events = [
  new Event('2020-08-08'),
  new Event('2022-08-15', '11:30:30'),
  new Event('2032-01-01', '11:30:50')
];

const renderEvents = (arr) => {
  if (arr.length === 0) c('Список событий пуст');

  else {
    let arrForDiv = []; //массив, где будут лежать результаты createElement

    arr.forEach( (event, idx) => {
      arrForDiv.push(document.createElement('div')); //создаём для каждого элемента массива тэг

      arrForDiv[idx].textContent = `Разница между датами. Лет: ${arr[idx].difference.years}. Месяцев: ${arr[idx].difference.mounths}. Дней: ${arr[idx].difference.days}. Часов: ${arr[idx].difference.hours}. Минут: ${arr[idx].difference.minutes}. Секунд: ${arr[idx].difference.seconds}`; //для каждого созданного тега делаем текстовое содержимое 

      dateResult.appendChild(arrForDiv[idx]); //вставляем на страницу
    })

    //каждую секунду для каждого эл-та понижаем кол-во милисекунд на 1000
    setInterval(
      () => {
        arr.forEach((event, idx)=> {

          event.difference=event.countDownTimer(event.difference.ms); //вычитаем 1000 милисекунд и возвращаем новое отформатированное значение

          arrForDiv[idx].textContent = `Разница между датами. Лет: ${arr[idx].difference.years}. Месяцев: ${arr[idx].difference.mounths}. Дней: ${arr[idx].difference.days}. Часов: ${arr[idx].difference.hours}. Минут: ${arr[idx].difference.minutes}. Секунд: ${arr[idx].difference.seconds}`;

        })
      }, 1000
    )
    
  }
}


const addNewEventInArray = (arr, event) => {
  arr.push(event); //запушили в старый массив новый элемент\событие
  dateResult.textContent=null; //обнулили ВСЁ(!), что отображалось до этого
  renderEvents(arr); //снова отрендерили это всё
}

takeDate.onclick = () => {
  if(dateValue.value.length === 0) noDate.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
  else {
    // events.push( new Event(dateValue.value, timeValue.value) )
    addNewEventInArray(events, new Event(dateValue.value, timeValue.value))

    dateValue.value = ''; //обнуляем значение поле поссле нажатия на кнопку
    timeValue.value = '';
    noDate.textContent='';
  }
}


renderEvents(events)