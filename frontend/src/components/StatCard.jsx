function StatCard({ title, value, description, icon, tone = 'blue' }) {
	return (
		<article className={`stat-card ${tone}`}>
			{icon && <div className="stat-icon" aria-hidden="true">{icon}</div>}
			<div>
				<p className="eyebrow">{title}</p>
				<strong className="stat-value">{value}</strong>
				<p className="stat-detail">{description}</p>
			</div>
		</article>
	)
}

export default StatCard