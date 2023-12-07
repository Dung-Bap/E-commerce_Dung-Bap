import React, { memo, useEffect, useRef, useState } from 'react';
import { voteOptions } from '../../ultils/contants';
import { AiFillStar } from 'react-icons/ai';
import Button from '../Button';

const VoteModal = ({ nameProduct, handleVoteSubmit }) => {
    const voteModalRef = useRef();
    const [score, setScore] = useState();
    const [comment, setComment] = useState('');

    useEffect(() => {
        voteModalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);

    return (
        <div
            onClick={e => e.stopPropagation()}
            ref={voteModalRef}
            className="bg-white min-h-[300px] w-full mx-[20px] rounded-md sm:w-[500px]"
        >
            <div className="flex flex-col items-center p-2 sm:p-5">
                <img
                    loading="lazy"
                    className="py-[20px]"
                    alt=""
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683"
                />
                <h2 className="py-[10px]">{`Voting product ${nameProduct}`}</h2>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Type something"
                    className="w-full form-textarea text-sm placeholder:italic placeholder:text-xs placeholder:text-gray-500"
                ></textarea>
                <div className="mb-[20px]">
                    <p className="py-[10px]">How do you like this product ?</p>
                    <div className="flex items-center ">
                        {voteOptions.map(voteOption => (
                            <div
                                onClick={() => setScore(voteOption.id)}
                                className="flex flex-col items-center justify-center p-1 mx-1 sm:p-4 sm:mx-2 rounded-md bg-[#ededed] hover:bg-slate-200 cursor-pointer"
                                key={voteOption.id}
                            >
                                {score >= voteOption.id ? <AiFillStar color="orange" /> : <AiFillStar color="gray" />}
                                <span className="min-w-[50px] text-[10px] flex justify-center">{voteOption.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    onClick={() => handleVoteSubmit(score, comment)}
                    className="w-full text-white bg-main p-2 rounded-md px-4 py-2 min-w-[88px]"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default memo(VoteModal);
