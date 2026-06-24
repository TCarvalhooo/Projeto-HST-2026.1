import Acidente from "../models/Acidente.js";

// POST /acidentes
export const criarAcidente = async (req, res) => {
  try {
    const { nome, cpf, cargo, empresa, dataAcidente, horarioAcidente, descricao } = req.body;

    if (!nome || !cpf || !cargo || !empresa || !dataAcidente || !horarioAcidente || !descricao) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }

    const novoAcidente = new Acidente({
      nome,
      cpf,
      cargo,
      empresa,
      dataAcidente,
      horarioAcidente,
      descricao,
    });

    const acidenteSalvo = await novoAcidente.save();

    res.status(201).json(acidenteSalvo);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar acidente.",
      erro: error.message,
    });
  }
};

// GET /acidentes
export const listarAcidentes = async (req, res) => {
  try {
    const { search } = req.query;

    let filtro = {};

    if (search && search.trim() !== "") {
      filtro = {
        nome: { $regex: search, $options: "i" },
      };
    }

    const acidentes = await Acidente.find(filtro).sort({ createdAt: -1 });

    res.status(200).json(acidentes);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar acidentes.",
      erro: error.message,
    });
  }
};

// GET /acidentes/:id
export const buscarAcidentePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const acidente = await Acidente.findById(id);

    if (!acidente) {
      return res.status(404).json({ mensagem: "Acidente não encontrado." });
    }

    res.status(200).json(acidente);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar acidente.",
      erro: error.message,
    });
  }
};

// PUT /acidentes/:id
export const atualizarAcidente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, cargo, empresa, dataAcidente, horarioAcidente, descricao } = req.body;

    if (!nome || !cpf || !cargo || !empresa || !dataAcidente || !horarioAcidente || !descricao) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }

    const acidenteAtualizado = await Acidente.findByIdAndUpdate(
      id,
      {
        nome,
        cpf,
        cargo,
        empresa,
        dataAcidente,
        horarioAcidente,
        descricao,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!acidenteAtualizado) {
      return res.status(404).json({ mensagem: "Acidente não encontrado." });
    }

    res.status(200).json(acidenteAtualizado);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar acidente.",
      erro: error.message,
    });
  }
};

// DELETE /acidentes/:id
export const deletarAcidente = async (req, res) => {
  try {
    const { id } = req.params;

    const acidenteRemovido = await Acidente.findByIdAndDelete(id);

    if (!acidenteRemovido) {
      return res.status(404).json({ mensagem: "Acidente não encontrado." });
    }

    res.status(200).json({ mensagem: "Acidente excluído com sucesso." });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao excluir acidente.",
      erro: error.message,
    });
  }
};