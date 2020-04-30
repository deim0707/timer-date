const c = console.log;


const dateValue = document.getElementById('date-value');
const takeDate = document.getElementById('take-date');
const dateResult = document.getElementById('date-result');



//происходит по клику на кнопку "Получить дату"
takeDate.onclick = function () {
    if(dateValue.value.length === 0) dateResult.textContent='Введите, пожалуйста, дату'
    else dateResult.textContent=dateValue.value
}

const newTime = (year, month, date, hours=0, minutes=0) => new Date(year, month, date, hours, minutes);

c(newTime(2012, 10, 11))