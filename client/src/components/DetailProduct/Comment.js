import React from 'react';
import momen from 'moment';
import { renderStars } from '../../ultils/helpers';

const Comment = ({ name = 'Anonymous', ...props }) => {
    return (
        <div className="mb-[30px]">
            <div className="w-full flex justify-between items-center mb-[10px]">
                <div className="flex items-center">
                    <img
                        loading="lazy"
                        className="w-[30px] h-[30px] object-cover rounded-[50%] mr-[10px]"
                        alt=""
                        src={
                            props.avatar ||
                            `https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png`
                        }
                    />
                    <span className="text-[16px] font-medium">{name}</span>
                </div>
                <span className="text-[12px] font-light italic">{momen(props.time).fromNow()}</span>
            </div>
            <div className="w-full border border-main bg-slate-200 p-4">
                <span className="flex items-center">
                    {renderStars(props.score, 16)?.map((el, index) => (
                        <span className="gap-1" key={index}>
                            {el}
                        </span>
                    ))}
                </span>
                <div className="flex mt-[10px]">
                    <div className="font-normal">{props.comment}</div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
