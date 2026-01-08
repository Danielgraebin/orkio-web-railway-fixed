export async function api(path, body, jwt){
  const base = import.meta.env.VITE_API_BASE_URL || '/api'
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? {'Authorization': `Bearer ${jwt}`} : {})
    },
    body: JSON.stringify(body || {})
  })
  if(!res.ok){
    const t = await res.text()
    throw new Error(`HTTP ${res.status}: ${t}`)
  }
  return res.json()
}
