import { useEffect, useState } from 'react'
import { collectionFromResponse, formatDate } from '../api.js'
import { EmptyState, ErrorState, ResourcePage } from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(activitiesApiUrl)
      .then((response) => { if (!response.ok) throw new Error('Could not load activities.'); return response.json() })
      .then((payload) => setActivities(collectionFromResponse(payload)))
      .catch((reason) => setError(reason.message))
  }, [])

  return (
    <ResourcePage eyebrow="The logbook" title="Activities" description="Every effort counts. Keep an eye on the rhythm of the community.">
      {error ? <ErrorState message={error} /> : <div className="data-list">{activities.map((activity) => <article className="data-row" key={activity._id ?? `${activity.type}-${activity.date}`}><div className="activity-icon">{activity.type?.slice(0, 1).toUpperCase()}</div><div className="row-main"><strong>{activity.type ?? 'Activity'}</strong><span>{activity.user?.name ?? activity.user?.username ?? 'OctoFit member'} · {formatDate(activity.date)}</span></div><span className="row-value">{activity.points ?? 0}<small> pts</small></span><span className="row-meta">{activity.duration ?? 0} min</span></article>)}</div>}
      {!error && activities.length === 0 && <EmptyState label="No activities logged yet." />}
    </ResourcePage>
  )
}

export default Activities
