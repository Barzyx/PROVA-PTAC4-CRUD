import { useEffect, useState } from 'react'
import FormularioAviso from './components/FormularioAviso'
import ListaAvisos from './components/ListaAvisos'
import './App.css'

const URL_API = 'https://jsonplaceholder.typicode.com/posts'

function App() {
  const [avisos, setAvisos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [mensagemFormulario, setMensagemFormulario] = useState('')

  useEffect(() => {
    const controlador = new AbortController()

    async function carregarAvisos() {
      try {
        setErro(null)
        const resposta = await fetch(`${URL_API}?_limit=15`, {
          signal: controlador.signal,
        })
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`)
        }
        const dados = await resposta.json()
        setAvisos(dados)
      } catch (erroCapturado) {
        if (erroCapturado.name === 'AbortError') return
        setErro('Não foi possível conectar à API. Verifique sua internet e recarregue a página.')
      } finally {
        if (!controlador.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    carregarAvisos()

    return () => controlador.abort()
  }, [])

  function aoEnviarFormulario(evento) {
    evento.preventDefault()

    if (titulo.trim() === '' || texto.trim() === '') {
      setMensagemFormulario('Preencha o título e o texto antes de publicar.')
      return
    }

    setMensagemFormulario('')
  }

  const listaVazia = !carregando && !erro && avisos.length === 0

  return (
    <div className="app">
      <header className="cabecalho">
        <h1>Mural de Avisos</h1>
      </header>
      <main className="conteudo">
        <aside className="coluna-formulario">
          <FormularioAviso
            titulo={titulo}
            texto={texto}
            mensagem={mensagemFormulario}
            aoMudarTitulo={setTitulo}
            aoMudarTexto={setTexto}
            aoEnviar={aoEnviarFormulario}
          />
        </aside>
        <section className="coluna-lista">
          <ListaAvisos avisos={avisos} />

          {carregando && <p className="estado">Carregando avisos...</p>}

          {erro && (
            <p className="estado estado-erro" role="alert">
              {erro}
            </p>
          )}

          {listaVazia && (
            <p className="estado">
              Nenhum aviso publicado — seja a primeira pessoa a escrever no mural.
            </p>
          )}
        </section>
      </main>
    </div>
  )
}

export default App