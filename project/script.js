const c = console.log;


const dateValue = document.getElementById('date-value'); //поле ввода даты
const takeDate = document.getElementById('take-date'); //кнопка получить дату
const dateResult = document.getElementById('date-result'); //блок с разницей по дням
const checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени
const inputTime = document.getElementById('input-time'); //поле ввода времени



const dateNow = new Date(); //сколько времени Сейчас
let newDate; //сюда запишется дата введёная пользователем
let difference; //сюда запишется разница между введёной датой и нынешней




//возвращает разницу между двумя датами в годах, месяцах, ... секундах
const getDifference = (dateNew, dateNow) => {
  let delta = Math.abs(dateNew - dateNow) / 1000; //тут получаем разницу в секунд между датами //сюда можно подставить кол-во милисекунд для трасформации даты
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
    seconds: seconds
  }
  c(obj)
  return obj;
}

//происходит по клику на кнопку "Получить дату"
takeDate.onclick = () => {
  if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
  else {
    const time = inputTime.value ? inputTime.value : '00:00:01'; //если пользовател не ввёл дату, то поставится 00:00:01
    newDate = new Date (`${dateValue.value}T${time}`) //получаем дату и время (при наличии) на момент нажатия кнопки
    difference = getDifference(newDate, dateNow); //рассчитали разницу между датами в днях
    c(`Сейчас: ${dateNow}. Введённая дата: ${newDate}. Разница между ними в днях: ${difference.days}`);
    dateResult.textContent = `Разница между датами. Лет: ${difference.years}. Месяцев: ${difference.mounths}. Дней: ${difference.days}. Часов: ${difference.hours}. Минут: ${difference.minutes}. Секунд: ${difference.seconds}`; 
  }
}


//происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
checkboxTime.onchange = (event) => {
  event.target.checked === false ? inputTime.classList.add('hidden') : inputTime.classList.remove('hidden');
}


//ЗАГОТОВКИ
//функция для создания новой даты
const getNewDate = (year, month, date, hours=0, minutes=0) => new Date(year, month, date, hours, minutes);

// https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html