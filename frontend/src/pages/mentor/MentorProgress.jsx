import { studentProgress } from '../../data/mentorDummyData'

function MentorProgress() {
  return (
    <div className="mentor-page">
      <div className="mentor-page-heading"><div><p className="mentor-eyebrow">STUDENT PROGRESS</p><h1>Progress overview</h1><p>See how students are progressing across their learning goals.</p></div></div>
      <div className="mentor-progress-cards">{studentProgress.map((student) => <section className="mentor-panel-card mentor-student-progress" key={student.id}><div className="mentor-student-progress-heading"><div><h2>{student.studentName}</h2><p>Latest learning snapshot</p></div><span className="mentor-risk on-track">On track</span></div><div className="mentor-detail-stats"><div><span>Attendance</span><strong>{student.attendance}%</strong></div><div><span>Resources complete</span><strong>{student.completedResources}</strong></div><div><span>Sessions attended</span><strong>{student.sessionsAttended}</strong></div></div><div className="mentor-subject-list">{student.subjects.map((subject) => <div className="mentor-subject-row" key={subject.name}><div><span>{subject.name}</span><strong>{subject.progress}%</strong></div><div className="mentor-progress-track"><span style={{ width: `${subject.progress}%` }} /></div></div>)}</div></section>)}</div>
    </div>
  )
}

export default MentorProgress
