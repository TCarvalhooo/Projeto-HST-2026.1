import mongoose from "mongoose";

const acidenteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome do funcionário é obrigatório"],
      trim: true,
    },
    cpf: {
      type: String,
      required: [true, "O CPF é obrigatório"],
      trim: true,
    },
    cargo: {
      type: String,
      required: [true, "O cargo é obrigatório"],
      trim: true,
    },
    empresa: {
      type: String,
      required: [true, "A empresa é obrigatória"],
      trim: true,
    },
    dataAcidente: {
      type: String,
      required: [true, "A data do acidente é obrigatória"],
    },
    horarioAcidente: {
      type: String,
      required: [true, "O horário do acidente é obrigatório"],
    },
    descricao: {
      type: String,
      required: [true, "A descrição do acidente é obrigatória"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Acidente = mongoose.model("Acidente", acidenteSchema);

export default Acidente;