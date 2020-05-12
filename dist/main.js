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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var setToStorage = exports.setToStorage = function setToStorage(key, arrWithItems) {
  return localStorage.setItem(key, JSON.stringify(arrWithItems));
};

var addToStorage = exports.addToStorage = function addToStorage(key, item) {
  return setToStorage(key, [].concat(_toConsumableArray(getEventFromStorage(key)), [item]));
};

var getEventFromStorage = exports.getEventFromStorage = function getEventFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) === null ? [] : JSON.parse(localStorage.getItem(key));
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventEntry = exports.timeFormatter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timeFormatter = exports.timeFormatter = function timeFormatter(date) {
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

var EventEntry = exports.EventEntry = function () {
    function EventEntry(name, date, time) {
        _classCallCheck(this, EventEntry);

        this._id = EventEntry.counter;
        this.name = name;
        this.newDate = new Date(date + 'T' + (time || '00:00:00'));
    }

    _createClass(EventEntry, null, [{
        key: 'counter',
        get: function get() {
            EventEntry._counter = Date.now();
            return EventEntry._counter;
        }
    }]);

    return EventEntry;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _storage = __webpack_require__(0);

var _render = __webpack_require__(3);

var _eventEntry = __webpack_require__(1);

var dateValue = document.getElementById('date-value'); //поле ввода даты события
var nameValue = document.getElementById('name-value'); //поле ввода имени события
var timeValue = document.getElementById('input-time'); //поле ввода времени
var makeDate = document.getElementById('take-date'); //кнопка Пуск
var dateResult = document.getElementById('date-result'); //сюда добавляем таймеры
var checkboxTime = document.getElementById('checkbox-time'); //чекбокс, отображения\скрытия времени

var interval = void 0; //переменная в общем поле видимости, которая позволит очистить интервал 
checkboxTime.onchange = function (event) {
    //происходит при нажатии на чекбокс "показать время". скрывает и показывает поле ввода времени
    event.target.checked === false ? timeValue.classList.add('hidden') : timeValue.classList.remove('hidden');
};

(0, _render.checkContent)(makeDate, dateValue, nameValue);

if (localStorage === null) {
    (0, _storage.setToStorage)('events', [new _eventEntry.EventEntry('Новый год', '2020-12-31')]);
    (0, _storage.addToStorage)('events', new _eventEntry.EventEntry('Начало летa', '2020-06-01', '11:30:30'));
}
if (localStorage.length === 0) {
    (0, _storage.setToStorage)('events', [new _eventEntry.EventEntry('Новый год', '2020-12-31')]);
    (0, _storage.addToStorage)('events', new _eventEntry.EventEntry('Начало летa', '2020-06-01', '11:30:30'));
    (0, _storage.addToStorage)('events', new _eventEntry.EventEntry('8 мая 11:30', '2020-05-08', '11:30:30'));
}

(0, _render.renderEvents)((0, _storage.getEventFromStorage)('events'), dateResult, interval);

makeDate.onclick = function () {
    (0, _render.addNewEventInRender)(dateResult, interval, new _eventEntry.EventEntry(nameValue.value, dateValue.value, timeValue.value));
    dateValue.value = '';
    nameValue.value = '';
    timeValue.value = '';
    makeDate.disabled = true;
};

// deleteEventFromRender(dateResult, interval, 'events',1)

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteEventFromRender = exports.addNewEventInRender = exports.renderEvents = exports.checkContent = undefined;

var _eventEntry = __webpack_require__(1);

var _storage = __webpack_require__(0);

//делает информационное сообщение на заданое кол-во мс
var makeInfoMessage = function makeInfoMessage(message, delay, target) {
    // info.innerHTML += `<div><b> ${message} </b></div>`;
    // setTimeout(() => info.innerHTML = null, delay);
    target.innerHTML += '<div><b> ' + message + ' </b></div>';
    setTimeout(function () {
        return target.innerHTML = null;
    }, delay);
};
//функция для разблокировки кнопки Пуск, когда ввели Дату и Имя события
var checkContent = exports.checkContent = function checkContent(target) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    args.forEach(function (arg) {
        arg.oninput = function () {
            if (args[0].value.length && args[1].value.length) {
                target.disabled = false;
            }
        };
    });
};

var renderEventTemplate = function renderEventTemplate(nameEvent, eventDifference, isPresent) {
    return '\n  <b>\u0421\u043E\u0431\u044B\u0442\u0438\u0435:</b> ' + nameEvent + '. \n  <b>' + (isPresent ? ' До него:' : 'C тех пор прошло:') + '</b>   \n  ' + (eventDifference.years !== 0 ? eventDifference.years + ' лет,' : '') + '  \n  ' + (eventDifference.months !== 0 ? eventDifference.months + ' месяцев,' : '') + ' \n  ' + (eventDifference.days !== 0 ? eventDifference.days + ' дней,' : '') + ' \n  ' + (eventDifference.hours !== 0 ? eventDifference.hours + ' часов,' : '') + ' \n  ' + (eventDifference.minutes + ' минут,') + ' \n  ' + (eventDifference.seconds + ' секунд') + ' \n  ';
};

var addButton = function addButton(id, target, interval) {
    var buttonDelete = document.createElement('button');
    buttonDelete.id = id;
    buttonDelete.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'mt-2');
    buttonDelete.innerHTML = '&#10008';
    buttonDelete.addEventListener('click', function () {
        return deleteEventFromRender(target, interval, 'events', id);
    });
    return buttonDelete;
};

var renderEvents = exports.renderEvents = function renderEvents(arr, target, interval) {
    // console.log(arr);
    if (arr.length === 0) makeInfoMessage('Список событий пуст', 4000, target);else {
        var arrForTegWrapper = []; //создаём тэг для каждой обёртки события
        var arrForTegWithContent = []; //создаём тэк для каждого содержимого с изменющейся информации о событии

        arr.forEach(function (event, idx) {
            arrForTegWrapper.push(document.createElement('div'));
            arrForTegWithContent.push(document.createElement('span'));

            var itemDifference = (0, _eventEntry.timeFormatter)(new Date(event.newDate) - new Date()); //разница во времени между заданной датой и нынешней

            if (itemDifference.ms > 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true); //для каждого созданного тега делаем  содержимое
            if (itemDifference.ms <= 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false); //если таймер кончился

            arrForTegWrapper[idx].appendChild(arrForTegWithContent[idx]); //добавляем в обёртку события контент
            arrForTegWrapper[idx].appendChild(addButton(event._id, target, interval)); //добавляем в обёртку события кнопку

            target.appendChild(arrForTegWrapper[idx]); //вставляем на страницу
        });

        //каждую секунду для каждого эл-та понижаем кол-во милисекунд на 1000
        interval = setInterval(function () {
            arr.forEach(function (event, idx) {
                var itemDifference = (0, _eventEntry.timeFormatter)(new Date(event.newDate) - 1000 - new Date()); //каждую секунду вычитаем из имеющеся даты 1000мс

                if (itemDifference.ms > 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, true);
                //если таймер кончился
                if (itemDifference.ms <= 0) arrForTegWithContent[idx].innerHTML = renderEventTemplate(event.name, itemDifference, false);
            });
            // console.log('интервал сработал')
        }, 1000);
    }
};

var addNewEventInRender = exports.addNewEventInRender = function addNewEventInRender(outputField, interval, event) {
    (0, _storage.addToStorage)('events', event);
    outputField.textContent = null;
    clearInterval(interval);
    renderEvents((0, _storage.getEventFromStorage)('events'), outputField, interval); //снова отрендерили это всё
};

var deleteEventFromRender = exports.deleteEventFromRender = function deleteEventFromRender(target, interval, key, id) {
    (0, _storage.setToStorage)(key, (0, _storage.getEventFromStorage)(key).filter(function (item) {
        return item._id !== id;
    }));
    target.textContent = null;
    clearInterval(interval);
    renderEvents((0, _storage.getEventFromStorage)(key), target, interval);
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map