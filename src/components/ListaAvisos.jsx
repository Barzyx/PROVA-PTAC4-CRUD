import CartaoAviso from './CartaoAviso'

function ListaAvisos({ avisos, aoEditar }) {
  return (
    <div className="lista">
      {avisos.map((aviso) => (
        <CartaoAviso key={aviso.id} aviso={aviso} aoEditar={aoEditar} />
      ))}
    </div>
  )
}

export default ListaAvisos