export const setToStorage = (key, arrWithItems) => localStorage.setItem(key, JSON.stringify(arrWithItems));

export const addToStorage = (key, item) => setToStorage(key, [...getEventFromStorage(key), item]);

export const getEventFromStorage = (key) => JSON.parse(localStorage.getItem(key));