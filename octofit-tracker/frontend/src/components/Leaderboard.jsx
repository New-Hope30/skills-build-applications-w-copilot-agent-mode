import { useEffect, useState } from 'react'
import { collectionFromResponse } from '../api.js'
import { EmptyState, ErrorState, ResourcePage } from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(leaderboardApiUrl).then((response) => { if (!response.ok) throw new Error('Could not load leaderboard.'); return response.json() }).then((payload) => setEntries(collectionFromResponse(payload))).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="The weekly table" title="Leaderboard" description="A little momentum, shared out loud. Rankings refresh as points come in.">{error ? <ErrorState message={error} /> : <div className="leaderboard-list">{entries.map((entry, index) => <article className={`leader-row ${index === 0 ? 'leader-row-top' : ''}`} key={entry._id ?? entry.user?._id}><span className="rank">{String(entry.rank ?? index + 1).padStart(2, '0')}</span><div className="avatar">{(entry.user?.name ?? '?').slice(0, 1)}</div><div className="row-main"><strong>{entry.user?.name ?? entry.user?.username ?? 'OctoFit member'}</strong><span>{index === 0 ? 'Leading the pack' : 'Keep the momentum going'}</span></div><span className="row-value">{entry.points ?? 0}<small> pts</small></span></article>)}</div>}{!error && entries.length === 0 && <EmptyState label="The leaderboard is waiting for its first points." />}</ResourcePage>
}

export default Leaderboard
