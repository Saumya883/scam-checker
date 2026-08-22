import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function BrowseReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('scam_reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError('Could not load reports. Please try again.')
      console.log(fetchError)
    } else {
      setReports(data)
    }

    setLoading(false)
  }

  if (loading) {
    return <p>Loading reports...</p>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Reported Scams</h2>
        <button onClick={fetchReports} style={{ marginTop: 0 }}>Refresh</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && reports.length === 0 && <p>No reports yet.</p>}

      {reports.map((report) => (
        <div key={report.id} className={`report-card ${report.status === 'verified_scam' ? 'confirmed' : ''}`}>
          <p><strong>Company:</strong> {report.reported_company_name}</p>
          <p className="mono"><strong>Domain:</strong> {report.claimed_domain}</p>
          <p><strong>Contact:</strong> {report.contact_email} {report.contact_phone}</p>
          <p><strong>Details:</strong> {report.offer_details}</p>
          <span className={`status-badge ${report.status === 'verified_scam' ? 'confirmed' : 'pending'}`}>
            {report.status === 'verified_scam' ? 'Confirmed scam' : 'Pending review'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default BrowseReports