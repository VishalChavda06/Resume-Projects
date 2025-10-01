import { StrictMode } from 'react'
import { Provider } from "../src/components/ui/provider.jsx"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider>
        <App />
      </Provider>
  </StrictMode>,
)
