function MentorSessionCard({ session }) {
  return (
    <article className={`mentor-session-card ${session.status}`}>
      <div className="mentor-session-date"><strong>{session.date}</strong><span>{session.time}</span></div>
      <div className="mentor-session-info"><span>{session.topic}</span><h3>{session.studentName}</h3></div>
      <span className={`mentor-session-status ${session.status}`}>{session.status}</span>
    </article>
  )
}

export default MentorSessionCard
