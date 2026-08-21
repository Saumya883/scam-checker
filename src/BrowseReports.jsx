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