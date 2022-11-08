import { createRoot } from 'react-dom/client';
import React from 'react';

import App from './components/App.jsx';

const element = document.getElementById('root');
const root = createRoot(element);
root.render(<App />);
