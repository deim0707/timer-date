/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var c = console.log;

var dateValue = document.getElementById('date-value'); //поле ввода даты события
var nameValue = document.getElementById('name-value'); //поле ввода имени события
var timeValue = document.getElementById('input-time'); //поле ввода времени
var makeDate = document.getElementById('take-date'); //кнопка Пуск
var dateResult = document.getElementById('date-result'); //сюда добавляем таймеры
var info = document.getElementById('info'); //место, куда можно выводить информационные сообщения
var checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени

var interval = void 0; //переменная в общем поле видимости, которая позволит очистить интервал 

//делает информационное сообщение на заданое кол-во мс
var makeInfoMessage = function makeInfoMessage(message, delay) {
    info.innerHTML += '<div><b> ' + message + ' </b></div>';
    setTimeout(function () {
        return info.innerHTML = null;
    }, delay);
};
//происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
checkboxTime.onchange = function (event) {
    event.target.checked === false ? timeValue.classList.add('hidden') : timeValue.classList.remove('hidden');
};
//функция для разблокировки кнопки Пуск, когда ввели Дату и Имя события
var checkContent = function checkContent() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    args.forEach(function (arg) {
        arg.oninput = function () {
            if (dateValue.value.length && nameValue.value.length) {
                makeDate.disabled = false;
            }
        };
    });
};
checkContent(dateValue, nameValue);

var timeFormatter = function timeFormatter(date) {
    var ms = Number(date);
    var delta = Math.abs(date) / 1000; //переводит дату в секунды
    var years = Math.floor(delta / 31536000); //сколько лет влазит в это кол-во секунд
    delta -= years * 31536000; //получаем остаток секунд, вычитая из него кол-во милисекунд в целых годах
    var months = Math.floor(delta / 2592000); //сколько месяцев влазит в остаток милисекунд после подсчёта Года
    delta -= months * 2592000;
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    var seconds = Math.floor(delta % 60);
    return {
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        ms: ms
    };
};

var Event = function () {
    function Event(name, date, time) {
        _classCallCheck(this, Event);

        this._id = Event.counter;
        this.name = name;
        this.newDate = new Date(date + 'T' + (time || '00:00:00'));
    }

    _createClass(Event, null, [{
        key: 'counter',
        get: function get() {
            //счётчик для id
            Event._counter = getEventFromStorage('events') ? getEventFromStorage('events').length + 1 : 1;
            return Event._counter;
        }
    }]);

    return Event;
}();

var setToStorage = function setToStorage(key, arrWithItems) {
    return localStorage.setItem(key, JSON.stringify(arrWithItems));
};
var addToStorage = function addToStorage(key, item) {
    return setToStorage(key, [].concat(_toConsumableArray(getEventFromStorage(key)), [item]));
};
var getEventFromStorage = function getEventFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};
// localStorage.clear()
// если localstorage пуст (запустили первый раз. то внесём в него 3 события)
if (localStorage.length === 0) {
    setToStorage('events', [new Event('Новый год', '2020-12-31')]);
    addToStorage('events', new Event('Начало летa', '2020-06-01', '11:30:30'));
    addToStorage('events', new Event('8 мая 11:30', '2020-05-08', '11:30:30'));
}

var renderEventTemplate = function renderEventTemplate(nameEvent, eventDifference, isPresent) {
    return '\n  <b>\u0421\u043E\u0431\u044B\u0442\u0438\u0435:</b> ' + nameEvent + '. \n  <b>' + (isPresent ? ' До него:' : 'C тех пор прошло:') + '</b>   \n  ' + (eventDifference.years !== 0 ? eventDifference.years + ' лет,' : '') + '  \n  ' + (eventDifference.months !== 0 ? eventDifference.months + ' месяцев,' : '') + ' \n  ' + (eventDifference.days !== 0 ? eventDifference.days + ' дней,' : '') + ' \n  ' + (eventDifference.hours !== 0 ? eventDifference.hours + ' часов,' : '') + ' \n  ' + (eventDifference.minutes + ' минут,') + ' \n  ' + (eventDifference.seconds + ' секунд') + ' \n  ';
};
var renderEvents = function renderEvents(arr) {
    console.log(arr);
    if (arr.length === 0) makeInfoMessage('Список событий пуст', 60000);else {
        var arrForTeg = []; //массив, где будут лежать результаты createElement

        arr.forEach(function (event, idx) {
            arrForTeg.push(document.createElement('p')); //создаём для каждого элемента массива тэг
            var itemDifference = timeFormatter(new Date(event.newDate) - new Date()); //каждую секунду пересчитывается разница во времени между заданной датой и нынешней

            //для каждого созданного тега делаем текстовое содержимое
            if (itemDifference.ms > 0) arrForTeg[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true);
            //если таймер кончился
            if (itemDifference.ms <= 0) arrForTeg[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false);

            dateResult.appendChild(arrForTeg[idx]); //вставляем на страницу
        });
        //каждую секунду для каждого эл-та понижаем кол-во милисекунд на 1000
        interval = setInterval(function () {
            arr.forEach(function (event, idx) {
                var itemDifference = timeFormatter(new Date(event.newDate) - 1000 - new Date());

                // event.difference = countDownTimer(event.difference.ms); //вычитаем 1000 милисекунд и возвращаем новое отформатированное значение
                if (itemDifference.ms > 0) arrForTeg[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true);
                //если таймер кончился
                if (itemDifference.ms <= 0) arrForTeg[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false);
            });
            // console.log('интервал сработал')
        }, 1000);
    }
};
var addNewEventInRender = function addNewEventInRender(event) {
    addToStorage('events', event);
    dateResult.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage('events')); //снова отрендерили это всё
};
renderEvents(getEventFromStorage('events'));

var deleteEventFromRender = function deleteEventFromRender(key, id) {
    setToStorage(key, getEventFromStorage(key).filter(function (item) {
        return item._id !== id;
    }));
    dateResult.textContent = null;
    clearInterval(interval);
    renderEvents(getEventFromStorage(key));
};
// deleteEventFromRender('events',3);

makeDate.onclick = function () {
    addNewEventInRender(new Event(nameValue.value, dateValue.value, timeValue.value));
    dateValue.value = '';
    nameValue.value = '';
    timeValue.value = '';
    makeDate.disabled = true;
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map