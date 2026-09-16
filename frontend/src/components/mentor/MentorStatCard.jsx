function MentorStatCard({ title, value, description, icon, tone = 'blue' }) {
  return (
    <article className={`mentor-stat-card ${tone}`}>
      <div className="mentor-stat-icon" aria-hidden="true">{icon}</div>
      <div><p>{title}</p><strong>{value}</strong><span>{description}</span></div>
    </article>
  )
}

export default MentorStatCard
