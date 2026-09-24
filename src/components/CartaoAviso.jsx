function CartaoAviso({ aviso, aoEditar }) {
  return (
    <article className="cartao">
      <h3>{aviso.title}</h3>
      <p>{aviso.body}</p>
      <small>Post #{aviso.id} · autor {aviso.userId}</small>
      <div className="cartao-acoes">
        <button type="button" onClick={() => aoEditar(aviso)}>
          Editar
        </button>
        <button type="button">Excluir</button>
      </div>
    </article>
  )
}

export default CartaoAviso