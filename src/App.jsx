import VerifyOffer from './VerifyOffer'
import Login from './Login'
import ReportScam from './ReportScam'
import BrowseReports from './BrowseReports'
import './App.css'

function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Job Offer Scam Checker</h1>
      <VerifyOffer />
      <hr style={{ margin: '2rem 0' }} />
      <Login />
      <ReportScam />
      <hr style={{ margin: '2rem 0' }} />
      <BrowseReports />
    </main>
  )
}

export default App