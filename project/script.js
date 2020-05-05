const c = console.log;


const dateValue = document.getElementById('date-value'); //поле ввода даты
const takeDate = document.getElementById('take-date'); //кнопка получить дату
const dateResult = document.getElementById('date-result'); //блок с разницей по дням
const checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени
const inputTime = document.getElementById('input-time'); //поле ввода времени



const dateNow = new Date(); //сколько времени Сейчас
let newDate; //сюда запишется дата введёная пользователем
let difference; //сюда запишется разница между введёной датой и нынешней


//приводит дату к годам, месяцам, дням, минутам, секундам
const timeFormatter = (date) => {
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
  let obj = { 
    years: years,
    mounths: mounths,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    ms: ms
  }
  c(obj)
  return obj;
}

//таймер обратного отсчёта даты
const countDownTimer = (date) => {
  return timeFormatter(date-1000)
}

//происходит по клику на кнопку "Получить дату"
takeDate.onclick = () => {
  if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
  else {
    const time = inputTime.value ? inputTime.value : '00:00:01'; //если пользовател не ввёл дату, то поставится 00:00:01
    newDate = new Date (`${dateValue.value}T${time}`) //получаем дату и время (при наличии) на момент нажатия кнопки
    difference = timeFormatter(newDate-dateNow); //рассчитали разницу между датами в днях
    // c(`Сейчас: ${dateNow}. Введённая дата: ${newDate}. Разница между ними в днях: ${difference.days}`);
    dateResult.textContent = `Разница между датами. Лет: ${difference.years}. Месяцев: ${difference.mounths}. Дней: ${difference.days}. Часов: ${difference.hours}. Минут: ${difference.minutes}. Секунд: ${difference.seconds}`; 
    setInterval( () => {
      difference=countDownTimer(difference.ms);
      dateResult.textContent = `Разница между датами. Лет: ${difference.years}. Месяцев: ${difference.mounths}. Дней: ${difference.days}. Часов: ${difference.hours}. Минут: ${difference.minutes}. Секунд: ${difference.seconds}`; 
    }, 1000)
  }
}


//происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
checkboxTime.onchange = (event) => {
  event.target.checked === false ? inputTime.classList.add('hidden') : inputTime.classList.remove('hidden');
}

