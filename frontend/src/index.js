import React from 'react';
import { createRoot } from 'react-dom/client';

import Init from './Init.jsx';

const element = document.getElementById('root');
const root = createRoot(element);
root.render(
  <Init />,
);
