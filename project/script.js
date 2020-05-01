const c = console.log;


const dateValue = document.getElementById('date-value');
const takeDate = document.getElementById('take-date');
const dateResult = document.getElementById('date-result');

const dateNow = new Date;
let newDate; //сюда запишется дата введёная пользователем
let differenceInDays; //сюда запишется разница между введёной датой и нынешней


//показывает разницу между датами в днях
const getDifferenceInDays = (date1, date2) =>  Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));


//происходит по клику на кнопку "Получить дату"
takeDate.onclick = () => {
    if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
    else {
        newDate = new Date (dateValue.value)
        differenceInDays=getDifferenceInDays(newDate, dateNow);
        c(`Сейчас: ${dateNow}. Введённая дата: ${newDate}. Разница между ними в днях: ${differenceInDays}`)
        dateResult.textContent=`Разница в днях между датами: ${differenceInDays}`;
    }
}




//ЗАГОТОВКИ
//функция для создания новой даты
const getNewDate = (year, month, date, hours=0, minutes=0) => new Date(year, month, date, hours, minutes);

//заготовка под таймер
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const checkTime = (date, idElement) => {
    var date = date;
    var sufix = '';
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var day = date.getDate();
    var month = monthNames[date.getMonth()];
    var weekday = dayNames[date.getDay()];
    if (day > 3 && day < 21) sufix = 'th';
    switch (day % 10) {
      case 1:
        sufix = "st";
      case 2:
        sufix = "nd";
      case 3:
        sufix = "rd";
      default:
        sufix = "th";
    }
    document.getElementById(idElement).innerHTML = "  Сейчас <span class='hour'>" + hours + ":" + minutes + "</span><br/><span class='date'>" + month + ' ' + day + sufix + ', ' + weekday + '.';
}

checkTime(dateNow, 'timer')