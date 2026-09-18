import { useEffect, useState } from 'react'
import { collectionFromResponse } from '../api.js'
import { EmptyState, ErrorState, ResourcePage } from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(workoutsApiUrl).then((response) => { if (!response.ok) throw new Error('Could not load workouts.'); return response.json() }).then((payload) => setWorkouts(collectionFromResponse(payload))).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="Your next move" title="Workouts" description="Pick a session that fits the moment, then make it yours."><div className="workout-grid">{error ? <ErrorState message={error} /> : workouts.map((workout) => <article className="workout-card" key={workout._id ?? workout.title}><div className="workout-top"><span className="category-tag">{workout.category}</span><span>{workout.duration} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.difficulty}</span><span className="arrow" aria-hidden="true">↗</span></footer></article>)}</div>{!error && workouts.length === 0 && <EmptyState label="No workouts are available yet." />}</ResourcePage>
}

export default Workouts
