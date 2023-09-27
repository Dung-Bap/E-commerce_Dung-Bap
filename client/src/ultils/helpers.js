import icons from './icons';

const { AiOutlineStar, AiFillStar } = icons;

export const createSlug = string => string.toLowerCase();
// .normalize('NFD')
// .replace(/\p{Diacritic}/gu, '')
// .split('');
// .join('-');

export const formatMoney = number => number?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
export const renderStars = (number, size) => {
    if (!Number(number)) return;
    const stars = [];
    number = Math.round(number);
    for (let i = 0; i < +number; i++) stars.push(<AiFillStar color="orange" size={size || 18} />);
    for (let i = 5; i > +number; i--) stars.push(<AiOutlineStar color="orange" size={size || 18} />);

    return stars;
};

export const generateRange = (start, end) => {
    const length = end + 1 - start;
    return Array.from({ length }, (_, index) => start + index);
};

export const validate = (payload, setInvalidFields) => {
    let invalids = 0;
    const formatPayload = Object.entries(payload);
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalids++;
            setInvalidFields(prev => [...prev, { name: arr[0], message: 'Require this field !' }]);
        }
    }
    return invalids;
};

export const convertToBase64 = file => {
    if (!file) return '';
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = error => {
            reject(error);
        };
    });
};
