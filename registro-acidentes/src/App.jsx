import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Registrar from "./pages/Registrar";
import Sobre from "./pages/Sobre";
import Detalhes from "./pages/Detalhes";
import EditarAcidente from "./pages/EditarAcidente";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
        <Route path="/editar/:id" element={<EditarAcidente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;