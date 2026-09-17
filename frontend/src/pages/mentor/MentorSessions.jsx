import MentorSessionCard from '../../components/mentor/MentorSessionCard'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function MentorSessions() {
  const { sessions, sessionsLoading, sessionsError, refreshSessions, onOpenSchedule } = useOutletContext()
  const [statusMessage, setStatusMessage] = useState('')
  const upcomingMentorSessions = sessions.filter((session) => !['completed', 'cancelled'].includes((session.status || '').toLowerCase()))
  const completedMentorSessions = sessions.filter((session) => ['completed', 'cancelled'].includes((session.status || '').toLowerCase()))

  async function updateStatus(id, status) {
    setStatusMessage('Updating...')
    try {
      const response = await fetch(`http://localhost:5000/api/mentor/sessions/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to update status.')
      await refreshSessions()
      setStatusMessage('Session status updated.')
    } catch (error) { setStatusMessage(error.message) }
  }

  return (
    <div className="mentor-page">
      <div className="mentor-page-heading"><div><p className="mentor-eyebrow">YOUR SCHEDULE</p><h1>Mentoring sessions</h1><p>Prepare for each conversation and keep students moving forward.</p></div><button className="mentor-primary-button" type="button" onClick={onOpenSchedule}>+ Schedule session</button></div>
      {statusMessage && <p className="form-success" role="status">{statusMessage}</p>}
      {sessionsError && <p className="form-error" role="alert">{sessionsError}</p>}
      <section className="mentor-panel-card mentor-full-card"><div className="mentor-section-heading"><div><h2>Upcoming sessions</h2><p>{upcomingMentorSessions.length} sessions scheduled</p></div></div><div className="mentor-session-list">{sessionsLoading ? <p className="modal-muted">Loading sessions...</p> : upcomingMentorSessions.map((session) => <div key={session.id}><MentorSessionCard session={session} /><select className="session-status-control" value={session.status} onChange={(event) => updateStatus(session.id, event.target.value)} aria-label={`Update status for ${session.studentName}`}><option>Pending</option><option>Scheduled</option><option>Completed</option><option>Cancelled</option></select></div>)}</div></section>
      <section className="mentor-panel-card mentor-full-card"><div className="mentor-section-heading"><div><h2>Completed sessions</h2><p>Recently completed mentoring sessions.</p></div></div><div className="mentor-session-list">{!sessionsLoading && completedMentorSessions.map((session) => <div key={session.id}><MentorSessionCard session={session} /><select className="session-status-control" value={session.status} onChange={(event) => updateStatus(session.id, event.target.value)} aria-label={`Update status for ${session.studentName}`}><option>Pending</option><option>Scheduled</option><option>Completed</option><option>Cancelled</option></select></div>)}</div></section>
    </div>
  )
}

export default MentorSessions
