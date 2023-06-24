import ReactDOM from 'react-dom/client';

export function mounteReact(innerApp: React.ReactElement) {
  ReactDOM.createRoot(document.getElementById('root') as Element).render(innerApp);
}
