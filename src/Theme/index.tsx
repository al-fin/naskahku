import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css'
import {useThemeContext} from '../contexts/theme-context';

interface Props {
  children: React.ReactNode  
}

export default function Theme(props: Props) {

  const {state} = useThemeContext();
  const [theme, setTheme] = React.useState<any>({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*::-webkit-scrollbar': {
            width: '0.4em',
            borderRadius: 2,
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.15)',
            outline: '1px solid slategrey'
          }
        },
      },
    },
  });


  React.useEffect(() => {
    setTheme({
      ...theme,
      palette: createPalette({
        primary: {
          main: state.theme === 'light' ? '#2196f3' : '#2196f3',
        },
        secondary: {
          main: state.theme === 'light' ? '#f50057' : '#f50057',
        },
        type: state.theme
      }),
    });

  }, [state])

  const themeConfig = createMuiTheme(theme);

  return (
    <>
    <MuiThemeProvider theme={themeConfig}>
    <CssBaseline />
      {props.children}
    </MuiThemeProvider> 
    </>
  );
}