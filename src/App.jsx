import { useEffect, useState } from 'react'
import FormularioAviso from './components/FormularioAviso'
import ListaAvisos from './components/ListaAvisos'
import './App.css'

const URL_API = 'https://jsonplaceholder.typicode.com/posts'

function App() {
  const [avisos, setAvisos] = useState([])

  useEffect(() => {
    const controlador = new AbortController()

    async function carregarAvisos() {
      try {
        const resposta = await fetch(`${URL_API}?_limit=15`, {
          signal: controlador.signal,
        })
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`)
        }
        const dados = await resposta.json()
        setAvisos(dados)
      } catch (erro) {
        if (erro.name === 'AbortError') return
        console.error(erro)
      }
    }

    carregarAvisos()

    return () => controlador.abort()
  }, [])

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
          <ListaAvisos avisos={avisos} />
        </section>
      </main>
    </div>
  )
}

export default App