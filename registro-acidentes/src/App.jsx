import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container-cards">
      <div className="card">
        <h3>Nome do funcionário: João</h3>
        <p>CPF: 123.456.789-00</p>
        <p>Cargo: Desenvolvedor</p>
        <div className="botoes">
          <button onClick={() => navigate("/detalhes")}>Ver Detalhes</button>
          <button>Editar</button>
          <button>Excluir</button>
        </div>
      </div>
    </div>
  );
}

function Detalhes() {
  return (
    <div className="detalhes-container">
      <h1>Detalhes do Acidente</h1>

      <div className="dados">
        <div>
          <strong>Funcionário</strong>
          <p>João Silva</p>
        </div>

        <div>
          <strong>CPF</strong>
          <p>123.456.789-00</p>
        </div>

        <div>
          <strong>Cargo</strong>
          <p>Desenvolvedor</p>
        </div>

        <div>
          <strong>Empresa</strong>
          <p>Tech Solutions</p>
        </div>

        <div>
          <strong>Data do acidente</strong>
          <p>20/06/2026</p>
        </div>

        <div>
          <strong>Horário do Acidente</strong>
          <p>14:30</p>
        </div>

        <div className="descricao">
          <strong>Descrição do acidente</strong>
          <p>
            O funcionário sofreu um acidente durante a execução de uma atividade
            no ambiente de trabalho.
          </p>
        </div>

        <button>Gerar PDF</button>
      </div>
    </div>
  );
}

function Registrar() {
  return (
    <div className="formulario">
      <h1>Registrar Acidente</h1>

      <input type="text" placeholder="Nome" />

      <input type="text" placeholder="CPF" />

      <input type="text" placeholder="Cargo" />

      <input type="text" placeholder="Empresa" />

      <input type="date" />

      <input type="time" />

      <textarea placeholder="Descrição do acidente" rows="5"></textarea>

      <button>Registrar Acidente</button>
    </div>
  );
}

function Sobre() {
  return (
    <div className="sobre">
      <h1>Sobre</h1>

      <p>
        O Sistema de Registro de Acidentes foi desenvolvido para facilitar o
        cadastro e o acompanhamento de ocorrências em ambientes de trabalho.
      </p>

      <p>
        A plataforma permite registrar informações importantes sobre acidentes,
        como dados do funcionário, empresa, data, horário e descrição do
        ocorrido, contribuindo para uma gestão mais organizada e segura.
      </p>

      <p>
        Nosso objetivo é auxiliar na prevenção de acidentes, no armazenamento de
        informações e na geração de relatórios para análise e tomada de decisão.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/detalhes" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
