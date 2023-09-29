import React, { useEffect, useRef } from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    const loadingRef = useRef();
    useEffect(() => {
        loadingRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);
    return (
        <div ref={loadingRef}>
            <HashLoader color="#ee3131" />;
        </div>
    );
};

export default Loading;
