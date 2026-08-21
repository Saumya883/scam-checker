import { useState } from 'react'
import { supabase } from './supabaseClient'

function VerifyOffer() {
  const [companyName, setCompanyName] = useState('')
  const [domain, setDomain] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [result, setResult] = useState(null)

  const checkOffer = async () => {
    const { data, error } = await supabase.functions.invoke('verify-offer', {
      body: { companyName, domain, emailBody }
    })
    if (!error) {
      setResult(data)
    } else {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Verify a Job Offer</h2>
      <input
        placeholder="Company name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        placeholder="Sender domain (e.g. infosys.com)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <textarea
        placeholder="Paste the offer message here"
        value={emailBody}
        onChange={(e) => setEmailBody(e.target.value)}
      />
      <button onClick={checkOffer}>Verify</button>

      {result && (
  <div className={`verdict-card ${result.verdict === 'HIGH_RISK' ? 'high' : result.verdict === 'CAUTION' ? 'caution' : 'low'}`}>
    <div className="seal">
      {result.verdict === 'HIGH_RISK' ? 'High Risk' : result.verdict === 'CAUTION' ? 'Caution' : 'Verified Safe'}
    </div>
    <div className="verdict-body">
      <h3>{result.verdict.replace('_', ' ')}</h3>
      <p className="mono">Risk score: {result.riskScore}</p>
      <p className="mono">Flags: {result.matchedSignals.join(', ') || 'None'}</p>
      {result.officialPortal && (
        <p>
          Official careers page:{' '}
          <a href={result.officialPortal} target="_blank" rel="noreferrer">
            {result.officialPortal}
          </a>
        </p>
      )}
    </div>
  </div>
)}
    </div>
  )
}

export default VerifyOffer