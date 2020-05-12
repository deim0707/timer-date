export const timeFormatter = (date) => {
    const ms = Number(date);
    let delta = Math.abs(date) / 1000; //переводит дату в секунды
    const years = Math.floor(delta / 31536000); //сколько лет влазит в это кол-во секунд
    delta -= years * 31536000; //получаем остаток секунд, вычитая из него кол-во милисекунд в целых годах
    const months = Math.floor(delta / 2592000); //сколько месяцев влазит в остаток милисекунд после подсчёта Года
    delta -= months * 2592000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = Math.floor(delta % 60);
    return {
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        ms: ms
    }
};

export class EventEntry {
    constructor(name, date, time) {
        this._id = EventEntry.counter;
        this.name = name;
        this.newDate = new Date(`${date}T${time || '00:00:00'}`);
    }

    static get counter() {
        EventEntry._counter = Date.now();
        return EventEntry._counter;
    }
}
