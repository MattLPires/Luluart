import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProjetosAcademicos from './pages/ProjetosAcademicos.jsx'
import ProjetoDetalhe from './pages/ProjetoDetalhe.jsx'
import Materiais from './pages/Materiais.jsx'
import Ilustracoes from './pages/Ilustracoes.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projetos-academicos" element={<ProjetosAcademicos />} />
      <Route path="/projetos-academicos/:slug" element={<ProjetoDetalhe />} />
      <Route path="/materiais" element={<Materiais />} />
      <Route path="/ilustracoes" element={<Ilustracoes />} />
    </Routes>
  )
}

export default App
