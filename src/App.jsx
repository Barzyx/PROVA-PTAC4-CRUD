import { useEffect, useState } from 'react'
import FormularioAviso from './components/FormularioAviso'
import ListaAvisos from './components/ListaAvisos'
import './App.css'

const URL_API = 'https://jsonplaceholder.typicode.com/posts'
const ID_USUARIO = 1

function App() {
  const [avisos, setAvisos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [erroExclusao, setErroExclusao] = useState('')

  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [mensagemFormulario, setMensagemFormulario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [avisoEmEdicao, setAvisoEmEdicao] = useState(null)

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

  function limparFormulario() {
    setTitulo('')
    setTexto('')
    setMensagemFormulario('')
  }

  function iniciarEdicao(aviso) {
    setAvisoEmEdicao(aviso)
    setTitulo(aviso.title)
    setTexto(aviso.body)
    setMensagemFormulario('')
    // O formulário fica no topo da página: leva a pessoa até ele.
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelarEdicao() {
    setAvisoEmEdicao(null)
    limparFormulario()
  }

  async function publicarAviso() {
    setEnviando(true)
    setMensagemFormulario('')

    try {
      const resposta = await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: ID_USUARIO,
          title: titulo.trim(),
          body: texto.trim(),
        }),
      })
      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`)
      }
      const criado = await resposta.json()

      // A API simula o salvamento e devolve sempre id 101.
      // Usamos um id local único para não repetir a key na lista.
      const proximoId = Math.max(0, ...avisos.map((aviso) => aviso.id)) + 1
      const novoAviso = { ...criado, id: proximoId }

      setAvisos((atuais) => [novoAviso, ...atuais])
      limparFormulario()
    } catch (erroCapturado) {
      console.error(erroCapturado)
      setMensagemFormulario('Não foi possível publicar o aviso. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  async function salvarEdicao() {
    setEnviando(true)
    setMensagemFormulario('')

    try {
      const resposta = await fetch(`${URL_API}/${avisoEmEdicao.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: avisoEmEdicao.id,
          userId: avisoEmEdicao.userId,
          title: titulo.trim(),
          body: texto.trim(),
        }),
      })
      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`)
      }
      const atualizado = await resposta.json()

      setAvisos((atuais) =>
        atuais.map((aviso) =>
          aviso.id === avisoEmEdicao.id ? { ...aviso, ...atualizado } : aviso
        )
      )
      setAvisoEmEdicao(null)
      limparFormulario()
    } catch (erroCapturado) {
      console.error(erroCapturado)
      setMensagemFormulario('Não foi possível salvar as alterações. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  async function excluirAviso(aviso) {
    const posicao = avisos.findIndex((item) => item.id === aviso.id)

    setErroExclusao('')
    if (avisoEmEdicao && avisoEmEdicao.id === aviso.id) {
      cancelarEdicao()
    }

    // Remoção otimista: o cartão some da tela antes da resposta da API.
    setAvisos((atuais) => atuais.filter((item) => item.id !== aviso.id))

    try {
      const resposta = await fetch(`${URL_API}/${aviso.id}`, {
        method: 'DELETE',
      })
      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`)
      }
    } catch (erroCapturado) {
      console.error(erroCapturado)

      // Rollback: devolve o aviso à posição em que estava.
      setAvisos((atuais) => {
        const copia = [...atuais]
        copia.splice(posicao, 0, aviso)
        return copia
      })
      setErroExclusao('Não foi possível excluir o aviso. Ele foi mantido no mural.')
    }
  }

  function aoEnviarFormulario(evento) {
    evento.preventDefault()

    if (titulo.trim() === '' || texto.trim() === '') {
      setMensagemFormulario('Preencha o título e o texto antes de publicar.')
      return
    }

    if (avisoEmEdicao) {
      salvarEdicao()
    } else {
      publicarAviso()
    }
  }

  const listaVazia = !carregando && !erro && avisos.length === 0
  const mostrarContador = !carregando && !erro

  return (
    <div className="app">
      <header className="cabecalho">
        <h1>Mural de Avisos</h1>
        <p className="cabecalho-subtitulo">Recados e comunicados da turma</p>
      </header>

      <main className="conteudo">
        <section className="area-formulario">
          <FormularioAviso
            titulo={titulo}
            texto={texto}
            mensagem={mensagemFormulario}
            enviando={enviando}
            editando={avisoEmEdicao !== null}
            aoMudarTitulo={setTitulo}
            aoMudarTexto={setTexto}
            aoEnviar={aoEnviarFormulario}
            aoCancelar={cancelarEdicao}
          />
        </section>

        <section className="area-lista">
          <div className="lista-topo">
            <h2 className="titulo-secao">Avisos recentes</h2>
            {mostrarContador && (
              <span className="contador">
                {avisos.length} {avisos.length === 1 ? 'aviso' : 'avisos'}
              </span>
            )}
          </div>

          {erroExclusao && (
            <p className="estado estado-erro" role="alert">
              {erroExclusao}
            </p>
          )}

          <ListaAvisos
            avisos={avisos}
            aoEditar={iniciarEdicao}
            aoExcluir={excluirAviso}
          />

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