import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../services/api";
import AcidenteForm from "../components/AcidenteForm/AcidenteForm";

function EditarAcidente() {
  const { id } = useParams();
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

  const [loadingPagina, setLoadingPagina] = useState(true);
  const [loadingSalvar, setLoadingSalvar] = useState(false);
  const [erro, setErro] = useState("");

  const buscarAcidente = async () => {
    try {
      setLoadingPagina(true);
      setErro("");

      const response = await fetch(`${API_URL}/acidentes/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar acidente.");
      }

      const data = await response.json();

      setFormData({
        nome: data.nome || "",
        cpf: data.cpf || "",
        cargo: data.cargo || "",
        empresa: data.empresa || "",
        dataAcidente: data.dataAcidente || "",
        horarioAcidente: data.horarioAcidente || "",
        descricao: data.descricao || "",
      });
    } catch (error) {
      setErro("Não foi possível carregar os dados do acidente.");
      console.error(error);
    } finally {
      setLoadingPagina(false);
    }
  };

  useEffect(() => {
    buscarAcidente();
  }, [id]);

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
      setLoadingSalvar(true);

      const response = await fetch(`${API_URL}/acidentes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar acidente.");
      }

      alert("Acidente atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      setErro("Não foi possível atualizar o acidente.");
      console.error(error);
    } finally {
      setLoadingSalvar(false);
    }
  };

  if (loadingPagina) {
    return <p className="mensagem">Carregando dados do acidente...</p>;
  }

  return (
    <AcidenteForm
      titulo="Editar Acidente"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loadingSalvar}
      erro={erro}
      textoBotao="Salvar Alterações"
      mostrarBotaoCancelar={true}
      onCancelar={() => navigate("/")}
    />
  );
}

export default EditarAcidente;