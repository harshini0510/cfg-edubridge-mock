import { Link, useOutletContext } from 'react-router-dom'
import ResourceCard from '../components/ResourceCard'
import SessionCard from '../components/SessionCard'
import StatCard from '../components/StatCard'
import { learningResources, mentor } from '../data/dummyData'

function StudentDashboard() {
	const { student, isLoading, error, sessions, sessionsLoading, sessionsError, onOpenBooking, onOpenMessage } = useOutletContext()
	const studentName = student?.name || 'Student'

	return (
		<div className="page">
			<div className="page-heading">
				<div>
					<p className="eyebrow blue-text">YOUR LEARNING HUB</p>
					<h1>{isLoading ? 'Loading your dashboard...' : `Good morning, ${studentName}`}</h1>
					<p className="page-intro">{error || 'Here is a quick look at your learning journey.'}</p>
				</div>
				<button className="primary-button" type="button" onClick={onOpenBooking}>+ Book a session</button>
			</div>

			<div className="stats-grid">
				<StatCard title="Attendance" value={student?.attendance != null ? `${student.attendance}%` : '-'} description="Your attendance this term" icon="✓" tone="blue" />
				<StatCard title="Overall progress" value={student?.overallProgress != null ? `${student.overallProgress}%` : '-'} description="Progress across all subjects" icon="↗" tone="green" />
				<StatCard title="Grade" value={student?.grade || '-'} description="Your current grade" icon="◷" tone="yellow" />
			</div>

			<div className="dashboard-grid">
				<section className="content-section">
					<div className="section-heading">
						<div><h2>Upcoming sessions</h2><p>Keep your momentum going.</p></div>
						<Link to="/student/sessions" className="text-link">View all <span>→</span></Link>
					</div>
					<div className="session-list">
						{sessionsLoading && <p className="modal-muted">Loading your sessions...</p>}
						{sessionsError && <p className="form-error" role="alert">{sessionsError}</p>}
						{!sessionsLoading && !sessionsError && sessions.length === 0 && <p className="modal-muted">No sessions booked yet.</p>}
						{sessions.slice(0, 2).map((session) => <SessionCard key={session.id} session={session} />)}
					</div>
				</section>

				<section className="mentor-panel">
					<div className="section-heading">
						<div><h2>Your mentor</h2><p>Someone in your corner.</p></div>
						<span className="online-dot">● Online</span>
					</div>
					<div className="mentor-profile">
						<span className="avatar avatar-large">PS</span>
						<div><h3>{mentor.name}</h3><p>Education and subject mentor</p></div>
					</div>
					<button className="secondary-button" type="button" onClick={onOpenMessage}>Message mentor</button>
				</section>
			</div>

			<div className="dashboard-grid lower-grid">
				<section className="content-section">
					<div className="section-heading">
						<div><h2>Learning resources</h2><p>Pick up where you left off.</p></div>
						<Link to="/student/resources" className="text-link">View all <span>→</span></Link>
					</div>
					<div className="resource-list">
						{learningResources.slice(0, 2).map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
					</div>
				</section>

				<section className="progress-panel">
					<div className="section-heading">
						<div><h2>Overall progress</h2><p>Across all subjects.</p></div>
					</div>
					<div className="progress-track"><span style={{ width: `${student?.overallProgress || 0}%` }} /></div>
					<strong className="stat-value">{student?.overallProgress != null ? `${student.overallProgress}%` : '-'}</strong>
				</section>
			</div>
		</div>
	)
}

export default StudentDashboard