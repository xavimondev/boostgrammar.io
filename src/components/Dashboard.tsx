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

    // fetch('/api/grammar', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     input: 'He live next to my houses'
    //   })
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //   })
  }, [])

  return (
    <>
      <h1>Eyyy hola</h1>
    </>
  )
}
