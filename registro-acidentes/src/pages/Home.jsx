import { useEffect, useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContextValue.jsx";
import { useNavigate } from "react-router-dom";
import API_URL from "../services/api";

function Home() {
  const navigate = useNavigate();
  const [acidentes, setAcidentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const { search } = useContext(SearchContext);

  const buscarAcidentes = async () => {
    try {
      setLoading(true);
      setErro("");

      const url = search
  ? `${API_URL}/acidentes?search=${search}`
  : `${API_URL}/acidentes`;

const response = await fetch(url);

      const data = await response.json();
      setAcidentes(data);
    } catch (error) {
      setErro("Não foi possível carregar os acidentes.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const timer = setTimeout(() => {
    buscarAcidentes();
  }, 300);

  return () => clearTimeout(timer);
}, [search]);

  const excluirAcidente = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este acidente?"
    );
    if (!confirmar) return;

    try {
      const response = await fetch(`${API_URL}/acidentes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir acidente.");
      }

      setAcidentes((prev) => prev.filter((acidente) => acidente._id !== id));
    } catch (error) {
      alert("Não foi possível excluir o acidente.");
      console.error(error);
    }
  };

  return (
    <div className="container-cards">
      {loading && <p className="mensagem">Carregando acidentes...</p>}

      {!loading && erro && <p className="mensagem erro">{erro}</p>}

      {!loading && !erro && acidentes.length === 0 && (
        <p className="mensagem">Nenhum acidente cadastrado ainda.</p>
      )}

      {!loading &&
        !erro &&
        acidentes.map((acidente) => (
          <div className="card" key={acidente._id}>
            <h3>Nome do funcionário: {acidente.nome}</h3>
            <p>CPF: {acidente.cpf}</p>
            <p>Cargo: {acidente.cargo}</p>

            <div className="botoes">
              <button onClick={() => navigate(`/detalhes/${acidente._id}`)}>
                Ver Detalhes
              </button>

              <button onClick={() => navigate(`/editar/${acidente._id}`)}>
                Editar
              </button>

              <button onClick={() => excluirAcidente(acidente._id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;