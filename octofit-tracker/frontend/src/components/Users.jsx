import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'
import { EmptyState, ErrorState, ResourcePage } from './ResourcePage.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('users').then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="The community" title="Users" description="Meet the people making movement part of their everyday story."><div className="people-grid">{error ? <ErrorState message={error} /> : users.map((user) => <article className="person-row" key={user._id ?? user.username}><div className="avatar avatar-large">{(user.name ?? user.username ?? '?').slice(0, 1)}</div><div><strong>{user.name ?? user.username}</strong><span>@{user.username}</span></div></article>)}</div>{!error && users.length === 0 && <EmptyState label="No users found." />}</ResourcePage>
}

export default Users
