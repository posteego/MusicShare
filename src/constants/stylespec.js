import { useColorScheme } from "react-native";

const dark = useColorScheme() === 'dark';
// color palette
// paletton.com
export const colors = Object.freeze({
  main: '#776DF2',
  accent: '#f2ee6e',
  secondary: '#574BEA',
  secondaryAccent: '#ffda5c',
  error: '#FC5B81',
  success: '#96FA5A',
  disabled: '#AAAAAA',
});
