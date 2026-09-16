import MentorSessionCard from '../../components/mentor/MentorSessionCard'
import { completedMentorSessions, upcomingMentorSessions } from '../../data/mentorDummyData'

function MentorSessions() {
  return (
    <div className="mentor-page">
      <div className="mentor-page-heading"><div><p className="mentor-eyebrow">YOUR SCHEDULE</p><h1>Mentoring sessions</h1><p>Prepare for each conversation and keep students moving forward.</p></div><button className="mentor-primary-button" type="button">+ Schedule session</button></div>
      <section className="mentor-panel-card mentor-full-card"><div className="mentor-section-heading"><div><h2>Upcoming sessions</h2><p>{upcomingMentorSessions.length} sessions scheduled</p></div></div><div className="mentor-session-list">{upcomingMentorSessions.map((session) => <MentorSessionCard key={session.id} session={session} />)}</div></section>
      <section className="mentor-panel-card mentor-full-card"><div className="mentor-section-heading"><div><h2>Completed sessions</h2><p>Recently completed mentoring sessions.</p></div></div><div className="mentor-session-list">{completedMentorSessions.map((session) => <MentorSessionCard key={session.id} session={session} />)}</div></section>
    </div>
  )
}

export default MentorSessions
