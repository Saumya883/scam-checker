import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function BrowseReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('scam_reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setReports(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <p>Loading reports...</p>
  }

  return (
    <div>
      <h2>Reported Scams</h2>
      {reports.length === 0 && <p>No reports yet.</p>}
      {reports.map((report) => (
        <div key={report.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Company:</strong> {report.reported_company_name}</p>
          <p><strong>Domain:</strong> {report.claimed_domain}</p>
          <p><strong>Contact:</strong> {report.contact_email} {report.contact_phone}</p>
          <p><strong>Details:</strong> {report.offer_details}</p>
          <p><strong>Status:</strong> {report.status}</p>
        </div>
      ))}
    </div>
  )
}

export default BrowseReports
