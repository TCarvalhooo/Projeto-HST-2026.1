import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../services/api";
import AcidenteForm from "../components/AcidenteForm/AcidenteForm";

function Registrar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cargo: "",
    empresa: "",
    dataAcidente: "",
    horarioAcidente: "",
    descricao: "",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const {
      nome,
      cpf,
      cargo,
      empresa,
      dataAcidente,
      horarioAcidente,
      descricao,
    } = formData;

    if (
      !nome ||
      !cpf ||
      !cargo ||
      !empresa ||
      !dataAcidente ||
      !horarioAcidente ||
      !descricao
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/acidentes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar acidente.");
      }

      alert("Acidente registrado com sucesso!");

      navigate("/");
    } catch (error) {
      setErro("Não foi possível registrar o acidente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AcidenteForm
      titulo="Registrar Acidente"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      erro={erro}
      textoBotao="Registrar Acidente"
    />
  );
}

export default Registrar;