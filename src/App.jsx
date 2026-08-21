import VerifyOffer from './VerifyOffer'
import Login from './Login'
import ReportScam from './ReportScam'
import BrowseReports from './BrowseReports'
import ThemeToggle from './ThemeToggle'
import './App.css'

function App() {
  return (
    <main>
      <div className="site-header">
        <div>
          <h1>Scam Shield</h1>
          <p className="tagline">Verify job offers. Report fraud. Protect your batch.</p>
        </div>
        <ThemeToggle />
      </div>

      <VerifyOffer />
      <hr />
      <Login />
      <ReportScam />
      <hr />
      <BrowseReports />
    </main>
  )
}

export default App