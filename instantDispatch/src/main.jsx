import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from './Components/redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-gm4lc48meks1kkjc.us.auth0.com"
        clientId="5bTikgdYcj1iZOqXso11R6Ykce4aDSSP"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </StrictMode>,
);
