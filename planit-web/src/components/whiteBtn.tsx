import React from 'react';

type WhiteBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
};

const WhiteBtn: React.FC<WhiteBtnProps> = ({ onClick, title = "", ...props }) => {
    return (
        <button 
            onClick={onClick} 
            {...props} 
            className='w-40 p-3 rounded-xl border border-gray-300 hover:bg-principal-dark transition-colors'
        >
            <span className='font-inter font-semibold text-center'>{title}</span>
        </button>
    );
};

export default WhiteBtn;