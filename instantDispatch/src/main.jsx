import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './Components/redux/store.jsx'
import { Provider } from 'react-redux'
import { store } from './Components/redux/store.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-gm4lc48meks1kkjc.us.auth0.com"
      clientId="5bTikgdYcj1iZOqXso11R6Ykce4aDSSP"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>,
);
