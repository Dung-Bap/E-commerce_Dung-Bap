export const createSlug = string =>
    string
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .split('')
        .join('-');
