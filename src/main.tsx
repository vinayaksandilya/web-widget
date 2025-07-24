import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ReactGA from "react-ga4";

ReactGA.initialize("G-71GV5V8YYQ");

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
