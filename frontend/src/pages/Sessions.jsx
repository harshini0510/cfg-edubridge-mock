import SessionCard from '../components/SessionCard'
import { completedSessions, upcomingSessions } from '../data/dummyData'
function Sessions() {
	return (
		<div className="page">
			<div className="page-heading">
				<div>
					<p className="eyebrow blue-text">YOUR SCHEDULE</p>
					<h1>Mentoring sessions</h1>
					<p className="page-intro">Plan your time and make every session count.</p>
				</div>
				<button className="primary-button" type="button">+ Book a session</button>
			</div>

			<section className="content-section full-section">
				<div className="section-heading"><div><h2>Upcoming sessions</h2><p>{upcomingSessions.length} sessions scheduled</p></div></div>
				<div className="session-list">
					{upcomingSessions.map((session) => <SessionCard key={session.id} session={session} />)}
				</div>
			</section>

			<section className="content-section full-section">
				<div className="section-heading"><div><h2>Completed sessions</h2><p>Sessions you have already attended.</p></div></div>
				<div className="session-list">
					{completedSessions.map((session) => <SessionCard key={session.id} session={session} />)}
				</div>
			</section>
		</div>
	)
}

export default Sessions