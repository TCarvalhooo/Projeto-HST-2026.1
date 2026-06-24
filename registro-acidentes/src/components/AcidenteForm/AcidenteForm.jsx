function AcidenteForm({
  titulo,
  formData,
  handleChange,
  handleSubmit,
  loading,
  erro,
  textoBotao,
  mostrarBotaoCancelar = false,
  onCancelar = null,
}) {
  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h1>{titulo}</h1>

      {erro && <p className="mensagem erro">{erro}</p>}

      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
      />

      <input
        type="text"
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleChange}
      />

      <input
        type="text"
        name="cargo"
        placeholder="Cargo"
        value={formData.cargo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="empresa"
        placeholder="Empresa"
        value={formData.empresa}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dataAcidente"
        value={formData.dataAcidente}
        onChange={handleChange}
      />

      <input
        type="time"
        name="horarioAcidente"
        value={formData.horarioAcidente}
        onChange={handleChange}
      />

      <textarea
        name="descricao"
        placeholder="Descrição do acidente"
        rows="5"
        value={formData.descricao}
        onChange={handleChange}
      ></textarea>

      {mostrarBotaoCancelar ? (
        <div className="botoes-formulario">
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : textoBotao}
          </button>

          <button
            type="button"
            className="botao-secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : textoBotao}
        </button>
      )}
    </form>
  );
}

export default AcidenteForm;