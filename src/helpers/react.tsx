import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export function mounteReact(innerApp: React.ReactElement) {
  createRoot(document.getElementById('root') as Element).render(<StrictMode>{innerApp}</StrictMode>);
}
