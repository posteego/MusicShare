import { Appearance, PixelRatio } from "react-native";

const colorScheme = Appearance.getColorScheme(); // 'dark' | 'light' | null
const fontScale = PixelRatio.getFontScale(); // iOS DynamicType etc

export const primaryFontColor = colorScheme === 'dark' ? '#f2ee6e' : '#000000';
