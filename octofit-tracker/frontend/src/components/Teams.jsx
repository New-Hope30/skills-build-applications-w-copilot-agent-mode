import { useEffect, useState } from 'react'
import { collectionFromResponse } from '../api.js'
import { EmptyState, ErrorState, ResourcePage } from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(teamsApiUrl).then((response) => { if (!response.ok) throw new Error('Could not load teams.'); return response.json() }).then((payload) => setTeams(collectionFromResponse(payload))).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="Find your people" title="Teams" description="The best kind of competition makes everyone stronger."><div className="team-grid">{error ? <ErrorState message={error} /> : teams.map((team) => <article className="team-card" key={team._id ?? team.name}><span className="team-symbol" aria-hidden="true">✦</span><h2>{team.name}</h2><p>{team.description || 'A team in motion.'}</p><footer><span>{team.members?.length ?? 0} members</span><span className="arrow" aria-hidden="true">↗</span></footer></article>)}</div>{!error && teams.length === 0 && <EmptyState label="No teams have been created yet." />}</ResourcePage>
}

export default Teams
