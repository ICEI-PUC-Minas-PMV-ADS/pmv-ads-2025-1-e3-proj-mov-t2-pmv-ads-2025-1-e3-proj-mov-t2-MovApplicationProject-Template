import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Agendamento from './pages/Agendamento'
import Homepage from './pages/Homepage'
import Editar from './pages/Editar'

interface AppProps {
  profId?: string;
}

function App({ profId }: AppProps) {
  useEffect(() => {
    if(profId) {
      localStorage.setItem('profissionalId', profId)
    }
  }, [profId])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/agendar" element={<Agendamento />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/editar" element={<Editar />} />
      </Routes>
    </Router>
  )
}

export default App;
