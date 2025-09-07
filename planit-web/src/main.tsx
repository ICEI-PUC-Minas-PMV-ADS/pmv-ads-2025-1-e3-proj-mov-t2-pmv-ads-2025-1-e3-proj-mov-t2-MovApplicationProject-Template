import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const urlParams = new URLSearchParams(window.location.search);
const profId = urlParams.get('profId');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App profId={profId || undefined} />
  </StrictMode>
)
