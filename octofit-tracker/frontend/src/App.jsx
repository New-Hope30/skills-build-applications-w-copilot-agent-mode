import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <section className="overview-page">
      <div className="overview-intro">
        <p className="eyebrow">Mergington High · activity hub</p>
        <h1>Move together.<br /><em>Go further.</em></h1>
        <p className="lede">A clear view of the people, teams, and small wins powering OctoFit this week.</p>
      </div>
      <div className="overview-grid">
        <NavLink className="overview-tile tile-coral" to="/activities"><span className="tile-kicker">Logbook</span><strong>Track every<br />effort</strong><span className="tile-link">Open activities <span aria-hidden="true">↗</span></span></NavLink>
        <NavLink className="overview-tile tile-ink" to="/leaderboard"><span className="tile-kicker">Friendly competition</span><strong>See who is<br />climbing</strong><span className="tile-link">View leaderboard <span aria-hidden="true">↗</span></span></NavLink>
        <NavLink className="overview-tile tile-mint" to="/workouts"><span className="tile-kicker">On your terms</span><strong>Find your<br />next session</strong><span className="tile-link">Browse workouts <span aria-hidden="true">↗</span></span></NavLink>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const currentPage = navigation.find((item) => item.path === location.pathname)?.label ?? 'OctoFit'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="OctoFit home"><img src="/octofitapp-small.png" alt="" /><span>OCTOFIT</span></NavLink>
        <p className="sidebar-label">Explore</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink key={item.path} to={item.path} end={item.path === '/'}><span className="nav-dot" aria-hidden="true" />{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" aria-hidden="true" /><span>API connected</span></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><span className="breadcrumb">Dashboard <span>/</span> {currentPage}</span><span className="season-mark">FALL 2026 <span aria-hidden="true">✦</span></span></header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Overview />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
