import React from 'react';
import Theme from '../Theme';
import Router from './Router';
import {AppProvider} from '../contexts/app-context';
import {ThemeContextProvider} from '../contexts/theme-context';
import Alert from './share/Alert';
import ServiceWorkerWrapper from './ServiceWorkerWrapper';

export default function App() {
  return (
    <ThemeContextProvider>
      <AppProvider>
        <Theme>
          <Router />
          <Alert />
          <ServiceWorkerWrapper />
        </Theme>
      </AppProvider>
    </ThemeContextProvider>
  );
}
