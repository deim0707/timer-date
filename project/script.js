const c = console.log;

const dateValue = document.getElementById('date-value'); //поле ввода даты
const takeDate = document.getElementById('take-date'); //кнопка получить дату
const dateResult = document.getElementById('date-result'); //блок с разницей по дням
const checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени
const inputTime = document.getElementById('input-time'); //поле ввода времени


//происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
checkboxTime.onchange = (event) => {
  event.target.checked === false ? inputTime.classList.add('hidden') : inputTime.classList.remove('hidden');
}


class EventHelpers {
  constructor(){}
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
  constructor (date, time='00:00:01') {
    super();
    this.newDate = new Date (`${date}T${time}`)
    this.dateNow = new Date();
    this.difference = this.timeFormatter(this.newDate-this.dateNow); //рассчитали разницу между датами в днях
  }
}

//функция отвечающая за рендер элемента
const renderEvent = (newTimer) => {
  const el = document.createElement('div'); //создали новый элемент, который позже вставим в конец body

  el.textContent = `Разница между датами. 
  Лет: ${newTimer.difference.years}.
  Месяцев: ${newTimer.difference.mounths}. 
  Дней: ${newTimer.difference.days}. 
  Часов: ${newTimer.difference.hours}. 
  Минут: ${newTimer.difference.minutes}. 
  Секунд: ${newTimer.difference.seconds}`; 

  document.body.appendChild(el); //вставили в конец body

  setInterval(
    () => {
      el.textContent = `Разница между датами. Лет: ${newTimer.difference.years}. Месяцев: ${newTimer.difference.mounths}. Дней: ${newTimer.difference.days}. Часов: ${newTimer.difference.hours}. Минут: ${newTimer.difference.minutes}. Секунд: ${newTimer.difference.seconds}`; //формируем из поступившего объекта текстовое содержимое с разницей во времени

      newTimer.difference=newTimer.countDownTimer(newTimer.difference.ms);
    }, 1000
  )
}

// takeDate.onclick = () => {
//   if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
//   else {
//     const newTimer = new Event(dateValue.value)
//     dateResult.textContent = `Разница между датами. Лет: ${newTimer.difference.years}. Месяцев: ${newTimer.difference.mounths}. Дней: ${newTimer.difference.days}. Часов: ${newTimer.difference.hours}. Минут: ${newTimer.difference.minutes}. Секунд: ${newTimer.difference.seconds}`; 

//     setInterval( () => {
//       newTimer.difference = newTimer.countDownTimer(newTimer.difference.ms);
//       dateResult.textContent = `Разница между датами. Лет: ${newTimer.difference.years}. Месяцев: ${newTimer.difference.mounths}. Дней: ${newTimer.difference.days}. Часов: ${newTimer.difference.hours}. Минут: ${newTimer.difference.minutes}. Секунд: ${newTimer.difference.seconds}`; 
//     }, 1000)
//   }
// }

takeDate.onclick = () => {
  if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
  else {
    const newTimer = new Event(dateValue.value) //ДОБАВИТЬ ВОЗМОЖНОСТЬ ДОБАВЛЯТЬ ВРЕМЯ
    renderEvent(newTimer);
    dateValue.value = '';
    dateValue.reset();
  }
}

const newTimer = new Event('2020-08-08');
renderEvent(newTimer)

const newTimer2 = new Event('2022-08-08', '11:30:30');
renderEvent(newTimer2)