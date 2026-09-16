function SessionCard({ session }) {
	return (
		<article className={`session-card ${session.status}`}>
			<div className="session-date">
				<strong>{session.date}</strong>
				<span>{session.mode}</span>
			</div>
			<div className="session-info">
				<span className="tag">{session.mode}</span>
				<h3>{session.subject}</h3>
				<p>{session.time} <span className="dot">•</span> {session.mentor}</p>
			</div>
			<span className={`session-status ${session.status}`}>{session.status}</span>
		</article>
	)
}

export default SessionCard