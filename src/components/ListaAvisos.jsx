import CartaoAviso from './CartaoAviso'

function ListaAvisos({ avisos }) {
  return (
    <div className="lista">
      {avisos.map((aviso) => (
        <CartaoAviso key={aviso.id} aviso={aviso} />
      ))}
    </div>
  )
}

export default ListaAvisos