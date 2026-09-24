function CartaoAviso({ aviso, aoEditar, aoExcluir }) {
  return (
    <article className="cartao">
      <h3>{aviso.title}</h3>
      <p>{aviso.body}</p>
      <small>Post #{aviso.id} · autor {aviso.userId}</small>
      <div className="cartao-acoes">
        <button type="button" onClick={() => aoEditar(aviso)}>
          Editar
        </button>
        <button type="button" onClick={() => aoExcluir(aviso)}>
          Excluir
        </button>
      </div>
    </article>
  )
}

export default CartaoAviso