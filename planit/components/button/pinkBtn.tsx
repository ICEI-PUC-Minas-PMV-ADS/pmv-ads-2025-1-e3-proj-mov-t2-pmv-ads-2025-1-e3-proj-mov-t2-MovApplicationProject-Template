import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type PinkBtnProps = TouchableOpacityProps & {
    title?: string;
};

const PinkBtn: React.FC<PinkBtnProps> = ({ onPress, title = "", ...props }) => {
    return (
        <TouchableOpacity onPress={onPress} {...props} className='w-40 p-4 rounded-xl bg-principal'>
            <Text className='text-white font-inter font-semibold text-center'>{title}</Text>
        </TouchableOpacity>
    );
};

export default PinkBtn; 