import { useState, useEffect } from 'preact/hooks'
import { supabase } from '../lib/database'

export function Dashboard() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log(session)
    })
  }, [])

  return (
    <>
      <h1>Eyyy hola</h1>
      {!session ? <span>User not logged</span> : <span>User logged</span>}
    </>
  )
}
