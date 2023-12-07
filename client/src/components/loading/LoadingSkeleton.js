import React from 'react';

const LoadingSkeleton = ({ className }) => {
    return <div className={`bg-gray-300 rounded animate-pulse ${className}`}></div>;
};

export default LoadingSkeleton;
