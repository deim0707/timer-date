const c = console.log;


const dateValue = document.getElementById('date-value');
const takeDate = document.getElementById('take-date');
const dateResult = document.getElementById('date-result');

const dateNow = new Date;
let newDate; //сюда запишется дата введёная пользователем
let differenceInDays; //сюда запишется разница между введёной датой и нынешней

//функция для создания новой даты //пригодится в будущем
const makeNewDate = (year, month, date, hours=0, minutes=0) => new Date(year, month, date, hours, minutes);
//показывает разницу между датами в днях
const makeDifferenceInDays = (date1, date2) =>  Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));


//происходит по клику на кнопку "Получить дату"
takeDate.onclick = () => {
    if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'; //проверка, введена ли дата
    else {
        newDate = new Date (dateValue.value)
        differenceInDays=makeDifferenceInDays(newDate, dateNow);
        c(`Сейчас: ${dateNow}. Введённая дата: ${newDate}. Разница между ними в днях: ${differenceInDays}`)
        dateResult.textContent=`Разница в днях между датами: ${differenceInDays}`;
    }
}


