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
      <div className="formulario-topo">
        <h2>{editando ? 'Editar aviso' : 'Novo aviso'}</h2>
        <p className="formulario-apoio">
          {editando
            ? 'Ajuste o título ou o texto e salve as alterações.'
            : 'Escreva um recado para a turma. Ele aparece no mural assim que for publicado.'}
        </p>
      </div>

      <div className="formulario-corpo">
        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(evento) => aoMudarTitulo(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="texto">Texto do aviso</label>
          <textarea
            id="texto"
            rows="4"
            value={texto}
            onChange={(evento) => aoMudarTexto(evento.target.value)}
          />
        </div>

        {mensagem && (
          <p className="formulario-mensagem" role="alert">
            {mensagem}
          </p>
        )}

        <div className="formulario-acoes">
          {editando && (
            <button type="button" onClick={aoCancelar} disabled={enviando}>
              Cancelar
            </button>
          )}
          <button type="submit" disabled={enviando}>
            {textoDoBotao()}
          </button>
        </div>
      </div>
    </form>
  )
}

export default FormularioAviso