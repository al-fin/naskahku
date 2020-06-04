import * as React from 'react'
interface Alert {
  open: boolean,
  variant?: 'success' | 'error',
  message?: string,
  duration?: number
}
type Action = {
  type: 'SET_ALERT',
  alert: Alert
}
type State = {
  alert: Alert
}
type Dispatch = (action: Action) => void
type AppProviderProps = {children: React.ReactNode}
const AppStateContext = React.createContext<State | undefined>(undefined)
const AppDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)
function appReducer(state: State, action: any) {
  switch (action.type) {
    case 'SET_ALERT': {
      console.log(action.alert)
      return {
        ...state,
        alert: {...state.alert, ...action.alert }
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function AppProvider({children}: AppProviderProps) {
  const [state, dispatch] = React.useReducer(appReducer, {
    alert: {
      open: false,
      variant: 'success',
      message: '',
      duration: 6000
    }
  })
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}
function useAppState() {
  const context = React.useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider')
  }
  return context
}
function useAppDispatch() {
  const context = React.useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider')
  }
  return context
}
export {AppProvider, useAppState, useAppDispatch}