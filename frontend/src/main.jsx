import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { I18nextProvider } from 'react-i18next'
import i18next from './i18n'
import App from './App.jsx'
import store from './Slices/index.js'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import rollbarConfig from './rollbar/rollbarConfig.js'

createRoot(document.getElementById('root')).render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <I18nextProvider i18n={i18next} defaultNS="translation">
              <App />
            </I18nextProvider>
          </BrowserRouter>
        </Provider>
      </StrictMode>
    </ErrorBoundary>
  </RollbarProvider>,
)
