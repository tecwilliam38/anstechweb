import { createRoot } from 'react-dom/client'
import './styles/global.css'
import Rotas from './routes.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Rotas />
  </AuthProvider>
)
