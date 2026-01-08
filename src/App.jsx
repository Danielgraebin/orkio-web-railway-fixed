import React, { useState } from 'react'
import { api } from './api.js'

export default function App(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [jwt, setJwt] = useState('')
  const [threadId, setThreadId] = useState('')
  const [text, setText] = useState('')
  const [log, setLog] = useState([])

  const pushLog = (m) => setLog(prev => [...prev, m])

  async function login(){
    try {
      const res = await api('/auth/login', { email, password })
      setJwt(res.access_token)
      pushLog('Login OK')
    } catch(e) { pushLog('Login ERRO: ' + e.message) }
  }

  async function createThread(){
    try {
      const res = await api('/agents/threads', {}, jwt)
      setThreadId(res.thread_id)
      pushLog('Thread criada: ' + res.thread_id)
    } catch(e) { pushLog('Thread ERRO: ' + e.message) }
  }

  async function sendMsg(){
    try {
      const res = await api('/agents/messages', { thread_id: threadId, content: text }, jwt)
      pushLog('Resposta: ' + (res.answer || 'ok'))
      setText('')
    } catch(e) { pushLog('Msg ERRO: ' + e.message) }
  }

  return (
    <div style={{maxWidth: 680, margin: '40px auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1>Orkio Web (MVP)</h1>
      <p>API: {import.meta.env.VITE_API_BASE_URL}</p>

      <section style={{marginBottom: 24}}>
        <h3>Login</h3>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="senha" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={login}>Entrar</button>
        {jwt && <span style={{marginLeft: 8}}>JWT ativo</span>}
      </section>

      <section style={{marginBottom: 24}}>
        <h3>Chat</h3>
        <button onClick={createThread} disabled={!jwt}>Criar Thread</button>
        {threadId && <span style={{marginLeft: 8}}>{threadId}</span>}
        <div style={{marginTop: 12}}>
          <input style={{width: '80%'}} placeholder="Digite..." value={text} onChange={e=>setText(e.target.value)} />
          <button onClick={sendMsg} disabled={!threadId}>Enviar</button>
        </div>
      </section>

      <section>
        <h3>Log</h3>
        <pre style={{background:'#f3f3f3', padding: 12, borderRadius: 8, minHeight: 120}}>
{log.map((l,i)=>(<div key={i}>{l}</div>))}
        </pre>
      </section>
    </div>
  )
}
