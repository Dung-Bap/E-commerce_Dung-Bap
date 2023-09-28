import { useMemo } from 'react';
import { generateRange } from '../ultils/helpers';
import icons from '../ultils/icons';

const usePagination = (totalProduct, currentPage, sibling = 1) => {
    const { PiDotsThreeOutlineDuotone } = icons;
    const paginationArr = useMemo(() => {
        const pageSize = process.env.REACT_APP_PAGE_SIZE;
        const paginationCount = Math.ceil(totalProduct / pageSize);
        const totalPaginationItem = sibling + 5;

        if (paginationCount <= totalPaginationItem) return generateRange(1, paginationCount);

        const isShowLeft = currentPage - sibling > 2; // lớn hơn 2
        const isShowRight = currentPage + sibling < paginationCount - 1; // lớn hơn 8

        if (isShowLeft && !isShowRight) {
            const rightStart = paginationCount - 4;
            const rightRange = generateRange(rightStart, paginationCount);
            return [1, <PiDotsThreeOutlineDuotone color={'red'} />, ...rightRange];
        }

        if (!isShowLeft && isShowRight) {
            const leftRange = generateRange(1, 5);
            return [...leftRange, <PiDotsThreeOutlineDuotone color={'red'} />, paginationCount];
        }

        const siblingLeft = Math.max(currentPage - sibling, 1);
        const siblingRight = Math.min(currentPage + sibling, paginationCount);

        if (isShowLeft && isShowRight) {
            const middleRange = generateRange(siblingLeft, siblingRight);
            return [
                1,
                <PiDotsThreeOutlineDuotone color={'red'} />,
                ...middleRange,
                <PiDotsThreeOutlineDuotone color={'red'} />,
                paginationCount,
            ];
        }
    }, [totalProduct, sibling, currentPage]);

    return paginationArr;
};

export default usePagination;

// first last sibling current 2dots
// sibling = 1: trang hiện tại có liền trước và sau là 1
// min = 6 => 5 + sibling
// paginationCount: totalProduct / limitProduct ex: 66 / 10 => 7

// [1,2,3,4,5,6]
// [1,...,6,7,8,9,10]
// [1,2,3,4,5,...,10]
// [1,...,5,6,7,...,10]
