function ResourceCard({ resource }) {
	const progress = Math.min(Math.max(resource.progress, 0), 100)

	return (
		<article className="resource-card">
			<div className="resource-icon" aria-hidden="true">▤</div>
			<div className="resource-copy">
				<span className="resource-type">{resource.type} · {resource.category}</span>
				<h3>{resource.title}</h3>
				<div className="progress-label">
					<span>{progress === 100 ? 'Complete' : `${progress}% complete`}</span>
					<span>{progress}%</span>
				</div>
				<div className="progress-track" aria-label={`${progress}% complete`}>
					<span style={{ width: `${progress}%` }} />
				</div>
			</div>
		</article>
	)
}

export default ResourceCard