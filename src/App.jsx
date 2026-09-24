import FormularioAviso from './components/FormularioAviso'
import ListaAvisos from './components/ListaAvisos'
import './App.css'

const avisosDeTeste = [
  { id: 1, userId: 1, title: 'Prova remarcada', body: 'A prova de sexta foi para segunda.' },
  { id: 2, userId: 1, title: 'Monitoria', body: 'Monitoria de JS na quarta, às 14h.' },
]

function App() {
  return (
    <div className="app">
      <header className="cabecalho">
        <h1>Mural de Avisos</h1>
      </header>
      <main className="conteudo">
        <aside className="coluna-formulario">
          <FormularioAviso />
        </aside>
        <section className="coluna-lista">
          <ListaAvisos avisos={avisosDeTeste} />
        </section>
      </main>
    </div>
  )
}

export default App