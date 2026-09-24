function FormularioAviso({
  titulo,
  texto,
  mensagem,
  enviando,
  editando,
  aoMudarTitulo,
  aoMudarTexto,
  aoEnviar,
  aoCancelar,
}) {
  function textoDoBotao() {
    if (editando) {
      return enviando ? 'Salvando...' : 'Salvar'
    }
    return enviando ? 'Publicando...' : 'Publicar aviso'
  }

  return (
    <form className="formulario" onSubmit={aoEnviar}>
      <h2>{editando ? 'Editar aviso' : 'Novo aviso'}</h2>

      <label htmlFor="titulo">Título</label>
      <input
        id="titulo"
        type="text"
        value={titulo}
        onChange={(evento) => aoMudarTitulo(evento.target.value)}
      />

      <label htmlFor="texto">Texto do aviso</label>
      <textarea
        id="texto"
        rows="6"
        value={texto}
        onChange={(evento) => aoMudarTexto(evento.target.value)}
      />

      {mensagem && (
        <p className="formulario-mensagem" role="alert">
          {mensagem}
        </p>
      )}

      <div className="formulario-acoes">
        <button type="submit" disabled={enviando}>
          {textoDoBotao()}
        </button>
        {editando && (
          <button type="button" onClick={aoCancelar} disabled={enviando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioAviso