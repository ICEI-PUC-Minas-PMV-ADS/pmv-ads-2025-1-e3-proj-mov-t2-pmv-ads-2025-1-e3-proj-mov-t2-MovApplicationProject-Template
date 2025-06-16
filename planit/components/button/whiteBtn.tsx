import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type WhiteBtnProps = TouchableOpacityProps & {
    title?: string;
};

const WhiteBtn: React.FC<WhiteBtnProps> = ({ onPress, title = "", ...props }) => {
    return (
        <TouchableOpacity onPress={onPress} {...props} className='w-40 p-4 bg-white border border-gray-400 rounded-xl'>
            <Text className='font-inter font-semibold text-center'>{title}</Text>
        </TouchableOpacity>
    );
};

export default WhiteBtn; 