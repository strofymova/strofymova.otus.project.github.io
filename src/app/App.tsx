import React from 'react';
import { Provider } from 'react-redux';
import { ClientProvider } from '../client';
import { Routing } from '../routing/Routing';
import { store } from '../store';
import { Initializer } from '../store/Initializer';
import LocalizationProvider from '../widgets/localization/LocalizationProvider';
import { Locale } from '../widgets/localization/settings';
import { Theme, ThemeProvider } from '../widgets/theme';

function App() {
  return (
    <LocalizationProvider initialLocale={Locale.ru}>
      <ThemeProvider initialTheme={Theme.dark}>
        <ClientProvider>
          <Provider store={store}>
            <Routing>
              <Initializer />
            </Routing>
          </Provider>
        </ClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
