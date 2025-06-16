import React from 'react';

type GreenBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
};

const GreenBtn: React.FC<GreenBtnProps> = ({ onClick, title = "", ...props }) => {
    return (
        <button 
            onClick={onClick} 
            {...props} 
            className='w-40 p-3 rounded-xl border border-emerald-600  bg-emerald-500 cursor-pointer text-white hover:bg-white hover:text-emerald-600 transition-colors'
        >
            <span className='font-inter font-semibold text-center'>{title}</span>
        </button>
    );
};

export default GreenBtn;