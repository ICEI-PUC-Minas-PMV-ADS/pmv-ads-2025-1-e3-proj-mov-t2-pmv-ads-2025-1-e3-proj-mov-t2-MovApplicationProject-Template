import React from 'react';

type PinkBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
};

const PinkBtn: React.FC<PinkBtnProps> = ({ onClick, title = "", ...props }) => {
    return (
        <button 
            onClick={onClick} 
            {...props} 
            className='w-40 p-3 rounded-xl bg-pink-700 hover:bg-principal-dark transition-colors'
        >
            <span className='text-white font-inter font-semibold text-center'>{title}</span>
        </button>
    );
};

export default PinkBtn;