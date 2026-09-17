import SessionCard from '../components/SessionCard'
import { useOutletContext } from 'react-router-dom'

function Sessions() {
	const { sessions, sessionsLoading, sessionsError, onOpenBooking } = useOutletContext()
	const completedSessions = sessions.filter((session) => ['completed', 'cancelled'].includes((session.status || '').toLowerCase()))
	const upcomingSessions = sessions.filter((session) => !['completed', 'cancelled'].includes((session.status || '').toLowerCase()))

	return (
		<div className="page">
			<div className="page-heading">
				<div>
					<p className="eyebrow blue-text">YOUR SCHEDULE</p>
					<h1>Mentoring sessions</h1>
					<p className="page-intro">Plan your time and make every session count.</p>
				</div>
				<button className="primary-button" type="button" onClick={onOpenBooking}>+ Book a session</button>
			</div>

			<section className="content-section full-section">
				<div className="section-heading"><div><h2>Upcoming sessions</h2><p>{upcomingSessions.length} sessions scheduled</p></div></div>
				<div className="session-list">
					{sessionsLoading && <p className="modal-muted">Loading your sessions...</p>}
					{sessionsError && <p className="form-error" role="alert">{sessionsError}</p>}
					{!sessionsLoading && !sessionsError && upcomingSessions.length === 0 && <p className="modal-muted">No upcoming sessions.</p>}
					{upcomingSessions.map((session) => <SessionCard key={session.id} session={session} />)}
				</div>
			</section>

			<section className="content-section full-section">
				<div className="section-heading"><div><h2>Completed sessions</h2><p>Sessions you have already attended.</p></div></div>
				<div className="session-list">
					{!sessionsLoading && !sessionsError && completedSessions.length === 0 && <p className="modal-muted">No completed sessions.</p>}
					{completedSessions.map((session) => <SessionCard key={session.id} session={session} />)}
				</div>
			</section>
		</div>
	)
}

export default Sessions