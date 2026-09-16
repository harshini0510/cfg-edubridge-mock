import { assignedStudents } from '../../data/mentorDummyData'

function MentorStudents() {
  return (
    <div className="mentor-page">
      <div className="mentor-page-heading"><div><p className="mentor-eyebrow">YOUR STUDENTS</p><h1>My students</h1><p>Track attendance and progress across your assigned students.</p></div><button className="mentor-primary-button" type="button">+ Add student</button></div>
      <section className="mentor-panel-card mentor-students-card">
        <div className="mentor-section-heading"><div><h2>Assigned students</h2><p>{assignedStudents.length} students in your group</p></div></div>
        <div className="mentor-table-wrap">
          <table className="mentor-students-table"><thead><tr><th>Student</th><th>Grade</th><th>Attendance</th><th>Progress</th><th>Status</th><th /></tr></thead><tbody>{assignedStudents.map((student) => <tr key={student.id}><td><strong>{student.name}</strong><span>{student.id}</span></td><td>{student.grade}</td><td>{student.attendance}%</td><td><div className="mentor-table-progress"><span>{student.progress}%</span><div className="mentor-progress-track"><span style={{ width: `${student.progress}%` }} /></div></div></td><td><span className={`mentor-risk ${student.status.toLowerCase().replace(' ', '-')}`}>{student.status}</span></td><td><button className="mentor-link-button" type="button">View details</button></td></tr>)}</tbody></table>
        </div>
      </section>
    </div>
  )
}

export default MentorStudents
