function FormularioAviso({
  titulo,
  texto,
  mensagem,
  aoMudarTitulo,
  aoMudarTexto,
  aoEnviar,
}) {
  return (
    <form className="formulario" onSubmit={aoEnviar}>
      <h2>Novo aviso</h2>

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

      <button type="submit">Publicar aviso</button>
    </form>
  )
}

export default FormularioAviso