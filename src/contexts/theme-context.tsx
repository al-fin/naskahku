import React from 'react';

type TypeTheme = 'light' | 'dark' | undefined;
interface State {
  theme: TypeTheme;
}

type Action = 
  | {type: 'SET_THEME', theme: TypeTheme}
  | {type: 'TOGGLE_THEME'}
  | {type: 'SWITCH_DARK_THEME'}
  | {type: 'SWITCH_LIGHT_THEME'};

interface ContextInterface {
  state: State;
  dispatch: (action: Action) => void;
}

const currentTheme = localStorage.getItem('theme') || 'light';
const initialState: State = {
  theme: currentTheme as TypeTheme
}


const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('theme', action.theme as string)
      return {...state, theme: action.theme}
    case 'TOGGLE_THEME':
      localStorage.setItem('theme', state.theme === 'light' ? 'dark' : 'light')
      return {...state, theme: state.theme === 'light' ? 'dark' : 'light'}
    case 'SWITCH_DARK_THEME':
      localStorage.setItem('theme', 'dark')
      return {...state, theme: 'dark'}
    case 'SWITCH_LIGHT_THEME':
      localStorage.setItem('theme', 'light')
      return {...state, theme: 'light'}
    default:
      return state;
  }
}

const ThemeContext = React.createContext<ContextInterface>({state: initialState} as ContextInterface);

function ThemeContextProvider(props: any) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context;
}

let ThemeContextConsumer = ThemeContext.Consumer;

export { ThemeContext, ThemeContextProvider, ThemeContextConsumer, useThemeContext };
