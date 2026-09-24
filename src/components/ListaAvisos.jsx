import CartaoAviso from './CartaoAviso'

function ListaAvisos({ avisos, aoEditar, aoExcluir }) {
  return (
    <div className="lista">
      {avisos.map((aviso) => (
        <CartaoAviso
          key={aviso.id}
          aviso={aviso}
          aoEditar={aoEditar}
          aoExcluir={aoExcluir}
        />
      ))}
    </div>
  )
}

export default ListaAvisos