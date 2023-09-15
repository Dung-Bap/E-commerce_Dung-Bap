import { useState, useEffect } from 'react';

const useDebouce = (data, delay) => {
    const [value, setvalue] = useState('');

    useEffect(() => {
        const setTimeoutValue = setTimeout(() => {
            setvalue(data);
        }, [delay]);
        return () => {
            clearTimeout(setTimeoutValue);
        };
    }, [data, delay]);

    return value;
};

export default useDebouce;
