import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../services/api";

function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [acidente, setAcidente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const buscarAcidente = async () => {
    try {
      setLoading(true);
      setErro("");

      const response = await fetch(`${API_URL}/acidentes/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes do acidente.");
      }

      const data = await response.json();
      setAcidente(data);
    } catch (error) {
      setErro("Não foi possível carregar os detalhes do acidente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarAcidente();
  }, [id]);

  if (loading) {
    return <p className="mensagem">Carregando detalhes...</p>;
  }

  if (erro) {
    return <p className="mensagem erro">{erro}</p>;
  }

  if (!acidente) {
    return <p className="mensagem">Acidente não encontrado.</p>;
  }

  return (
    <div className="detalhes-container">
      <h1>Detalhes do Acidente</h1>

      <div className="dados">
        <div>
          <strong>Funcionário</strong>
          <p>{acidente.nome}</p>
        </div>

        <div>
          <strong>CPF</strong>
          <p>{acidente.cpf}</p>
        </div>

        <div>
          <strong>Cargo</strong>
          <p>{acidente.cargo}</p>
        </div>

        <div>
          <strong>Empresa</strong>
          <p>{acidente.empresa}</p>
        </div>

        <div>
          <strong>Data do acidente</strong>
          <p>{acidente.dataAcidente}</p>
        </div>

        <div>
          <strong>Horário do acidente</strong>
          <p>{acidente.horarioAcidente}</p>
        </div>

        <div className="descricao">
          <strong>Descrição do acidente</strong>
          <p>{acidente.descricao}</p>
        </div>
      </div>

      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default Detalhes;