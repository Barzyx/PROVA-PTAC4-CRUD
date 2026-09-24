function CartaoAviso({ aviso, aoEditar, aoExcluir }) {
  return (
    <article className="cartao">
      <small className="cartao-meta">
        <span className="cartao-id">Post #{aviso.id}</span>
        <span>autor {aviso.userId}</span>
      </small>
      <h3>{aviso.title}</h3>
      <p>{aviso.body}</p>
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