
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import WebFont from 'webfontloader';
import './index.css';
import { App } from './App';
import { LoadingSpinner } from './components/molecule/LoadingSpinner';

/* eslint-disable react-refresh/only-export-components */
const Root: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Almendra:400,700'],
      },
      active: () => {
        setLoaded(true);
        document.body.classList.add('fonts-loaded');
      },
    });
  }, []);

  return loaded ? <App /> : <LoadingSpinner />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);