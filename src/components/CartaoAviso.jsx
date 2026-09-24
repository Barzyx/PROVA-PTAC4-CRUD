function CartaoAviso({ aviso }) {
  return (
    <article className="cartao">
      <h3>{aviso.title}</h3>
      <p>{aviso.body}</p>
      <small>Post #{aviso.id} · autor {aviso.userId}</small>
      <div className="cartao-acoes">
        <button type="button">Editar</button>
        <button type="button">Excluir</button>
      </div>
    </article>
  )
}

export default CartaoAviso