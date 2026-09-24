function FormularioAviso() {
  return (
    <form className="formulario">
      <h2>Novo aviso</h2>
      <label htmlFor="titulo">Título</label>
      <input id="titulo" type="text" />
      <label htmlFor="texto">Texto do aviso</label>
      <textarea id="texto" rows="6" />
      <button type="submit">Publicar aviso</button>
    </form>
  )
}

export default FormularioAviso