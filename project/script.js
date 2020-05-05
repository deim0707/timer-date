const c = console.log;


const dateValue = document.getElementById('date-value'); //поле ввода даты
const takeDate = document.getElementById('take-date'); //кнопка получить дату
const dateResult = document.getElementById('date-result'); //блок с разницей по дням
const checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени
const inputTime = document.getElementById('input-time'); //поле ввода времени



const dateNow = new Date(); //сколько времени Сейчас
let newDate; //сюда запишется дата введёная пользователем
let differenceInDays; //сюда запишется разница между введёной датой и нынешней


//показывает разницу между датами в днях
const getDifferenceInDays = (date1, date2) =>  Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));


//происходит по клику на кнопку "Получить дату"
takeDate.onclick = () => {
  if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
  else {
    const time = inputTime.value ? inputTime.value : '00:00:01'; //если пользовател не ввёл дату, то поставится 00:00:01
    newDate = new Date (`${dateValue.value}T${time}`) //получаем дату и время (при наличии) на момент нажатия кнопки
    differenceInDays=getDifferenceInDays(newDate, dateNow); //рассчитали разницу между датами в днях
    c(`Сейчас: ${dateNow}. Введённая дата: ${newDate}. Разница между ними в днях: ${differenceInDays}`)
    dateResult.textContent=`Разница в днях между датами: ${differenceInDays}`; 
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