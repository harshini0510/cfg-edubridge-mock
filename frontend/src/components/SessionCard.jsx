function SessionCard({ session }) {
	const status = (session.status || '').toLowerCase()
	const subject = session.subject || session.topic || 'Mentoring session'
	const mentor = session.mentor || session.mentorName || 'Mentor'
	const mode = session.mode || 'Mentoring session'

	return (
		<article className={`session-card ${status}`}>
			<div className="session-date">
				<strong>{session.date}</strong>
				<span>{mode}</span>
			</div>
			<div className="session-info">
				<span className="tag">{mode}</span>
				<h3>{subject}</h3>
				<p>{session.time} <span className="dot">•</span> {mentor}</p>
			</div>
			<span className={`session-status ${status}`}>{session.status}</span>
		</article>
	)
}

export default SessionCard