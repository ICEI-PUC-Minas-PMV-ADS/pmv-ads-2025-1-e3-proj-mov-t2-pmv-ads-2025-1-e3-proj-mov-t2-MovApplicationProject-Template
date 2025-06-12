/**
 * Abaixo estão as cores utilizadas no aplicativo. As cores estão definidas para o modo claro.
 * Existem muitas outras formas de estilizar seu app. Por exemplo: [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
    principal: '#FF006F',
    secundaria: '#E1FF00',
    branco: '#FFFFFF',
    preto: '#000',
    rosaleve: '#FFE5EF',
    error: '#FF3B30',
    neutro: '#F4F7FE',
    cinza: '#4B5563', // p/ textos
    iconNavDefault: '#B4B6B8' // quando o icon da navegação não está selecionado
};

/** COMO USAR O COLORS? (EXEMPLO DE USO ABAIXO!)

import { Colors } from '../constants/Colors';

<View style={{ backgroundColor: Colors.principal }} />

**/

/** Você pode optar por usar um jeito mais curto com o tailwind.config.js: */