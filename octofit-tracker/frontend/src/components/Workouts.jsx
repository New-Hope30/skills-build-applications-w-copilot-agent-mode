import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import { EmptyState, ErrorState, ResourcePage } from './ResourcePage.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="Your next move" title="Workouts" description="Pick a session that fits the moment, then make it yours."><div className="workout-grid">{error ? <ErrorState message={error} /> : workouts.map((workout) => <article className="workout-card" key={workout._id ?? workout.title}><div className="workout-top"><span className="category-tag">{workout.category}</span><span>{workout.duration} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.difficulty}</span><span className="arrow" aria-hidden="true">↗</span></footer></article>)}</div>{!error && workouts.length === 0 && <EmptyState label="No workouts are available yet." />}</ResourcePage>
}

export default Workouts
