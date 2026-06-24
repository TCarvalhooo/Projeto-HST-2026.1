import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const gerarPDF = async () => {
    const elemento = document.getElementById("pdf-content");

    const canvas = await html2canvas(elemento);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;

    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`acidente-${id}.pdf`);
  };

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
    <div id="pdf-content" className="detalhes-container">
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

      <button onClick={gerarPDF}>Gerar PDF</button>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default Detalhes;