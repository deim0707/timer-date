export const setToStorage = (key, items) => localStorage.setItem(key, JSON.stringify(items));

export const addToStorage = (key, item) => setToStorage(key, [...getFromStorage(key), item]);

export const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) === null ? [] : JSON.parse(localStorage.getItem(key));
