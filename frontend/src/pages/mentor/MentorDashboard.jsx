import { Link } from 'react-router-dom'
import MentorSessionCard from '../../components/mentor/MentorSessionCard'
import MentorStatCard from '../../components/mentor/MentorStatCard'
import { mentor, mentorStats, recentActivity, assignedStudents, upcomingMentorSessions } from '../../data/mentorDummyData'

function MentorDashboard() {
  return (
    <div className="mentor-page">
      <div className="mentor-page-heading">
        <div><p className="mentor-eyebrow">MENTOR WORKSPACE</p><h1>Good morning, {mentor.name}</h1><p>Here is an overview of your students and sessions.</p></div>
        <button className="mentor-primary-button" type="button">+ Schedule session</button>
      </div>

      <div className="mentor-stats-grid">
        <MentorStatCard title="Assigned students" value={mentorStats.assignedStudents} description="Students in your care" icon="◉" />
        <MentorStatCard title="Active students" value={mentorStats.activeStudents} description="Engaged this month" icon="✓" tone="green" />
        <MentorStatCard title="Sessions this week" value={mentorStats.sessionsThisWeek} description="Across all students" icon="◷" tone="yellow" />
        <MentorStatCard title="Average progress" value={`${mentorStats.averageProgress}%`} description="Across your student group" icon="↗" tone="blue" />
      </div>

      <div className="mentor-dashboard-grid">
        <section className="mentor-panel-card">
          <div className="mentor-section-heading"><div><h2>Upcoming sessions</h2><p>Your next mentoring conversations.</p></div><Link to="/mentor/sessions">View all →</Link></div>
          <div className="mentor-session-list">{upcomingMentorSessions.slice(0, 3).map((session) => <MentorSessionCard key={session.id} session={session} />)}</div>
        </section>
        <section className="mentor-panel-card">
          <div className="mentor-section-heading"><div><h2>Student progress</h2><p>A quick view of your group.</p></div><Link to="/mentor/progress">Details →</Link></div>
          <div className="mentor-progress-list">{assignedStudents.slice(0, 4).map((student) => <div className="mentor-progress-row" key={student.id}><div><span>{student.name}</span><strong>{student.progress}%</strong></div><div className="mentor-progress-track"><span style={{ width: `${student.progress}%` }} /></div></div>)}</div>
        </section>
      </div>

      <section className="mentor-panel-card mentor-activity-card">
        <div className="mentor-section-heading"><div><h2>Recent activity</h2><p>Latest updates from your students.</p></div><Link to="/mentor/students">View students →</Link></div>
        <div className="mentor-activity-list">{recentActivity.map((activity) => <div className="mentor-activity-item" key={activity.id}><span className="mentor-activity-dot" /><div><p>{activity.text}</p><span>{activity.time}</span></div></div>)}</div>
      </section>
    </div>
  )
}

export default MentorDashboard
