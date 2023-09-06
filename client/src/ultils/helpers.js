export const createSlug = string =>
    string
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .split('')
        .join('-');

export const formatMoney = number => number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
