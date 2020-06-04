import React from 'react';
import {useThemeContext} from '../contexts/theme-context';
import createPalette from '@material-ui/core/styles/createPalette';


const useDarkMode = () => {
  const {state} = useThemeContext();
  const [theme, setTheme] = React.useState<any>({
    palette: createPalette({
      type: state.theme,
    }),
  });

  const toggleDarkMode = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType
      }
    });
   }
  return [theme, toggleDarkMode];
}

export default useDarkMode;
