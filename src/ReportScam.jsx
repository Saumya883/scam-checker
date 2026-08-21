import { useState } from 'react'
import { supabase } from './supabaseClient'

function ReportScam() {
  const [companyName, setCompanyName] = useState('')
  const [claimedDomain, setClaimedDomain] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [offerDetails, setOfferDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const submitReport = async () => {
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in to submit a report.')
      return
    }

    const { error: insertError } = await supabase
      .from('scam_reports')
      .insert({
        reported_company_name: companyName,
        claimed_domain: claimedDomain,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        offer_details: offerDetails,
        reporter_id: user.id,
      })

    if (insertError) {
      setError(insertError.message)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return <p>Thank you — your report has been submitted for review.</p>
  }

  return (
    <div>
      <h2>Report a Scam</h2>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Only enter the scammer's contact details below — not your own.
      </p>
      <input
        placeholder="Company name (as claimed)"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        placeholder="Domain used in the email/message"
        value={claimedDomain}
        onChange={(e) => setClaimedDomain(e.target.value)}
      />
      <input
        placeholder="Scammer's email address (from the offer)"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
      />
      <input
        placeholder="Scammer's phone/WhatsApp number (from the offer)"
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
      />
      <textarea
        placeholder="Describe the offer / paste the message"
        value={offerDetails}
        onChange={(e) => setOfferDetails(e.target.value)}
      />
      <button onClick={submitReport}>Submit Report</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default ReportScam