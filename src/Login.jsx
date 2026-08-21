import { useState } from 'react'
import { supabase } from './supabaseClient'

function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const sendMagicLink = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return <p>Check your email for a login link.</p>
  }

  return (
    <div>
      <h3>Login to Submit Reports</h3>
      <input
        placeholder="your.email@college.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendMagicLink}>Send Login Link</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default Login