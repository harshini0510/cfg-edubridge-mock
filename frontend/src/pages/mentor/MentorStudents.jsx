import { useOutletContext } from 'react-router-dom'

function MentorStudents() {
	const { students, studentsLoading, studentsError, onOpenAddStudent, onViewStudent } = useOutletContext()
  return (
    <div className="mentor-page">
      <div className="mentor-page-heading"><div><p className="mentor-eyebrow">YOUR STUDENTS</p><h1>My students</h1><p>Track attendance and progress across your assigned students.</p></div><button className="mentor-primary-button" type="button" onClick={onOpenAddStudent}>+ Add student</button></div>
      <section className="mentor-panel-card mentor-students-card">
        <div className="mentor-section-heading"><div><h2>Assigned students</h2><p>{students.length} students in your group</p></div></div>
        <div className="mentor-table-wrap">
          {studentsLoading && <p className="modal-muted">Loading students...</p>}
          {studentsError && <p className="form-error" role="alert">{studentsError}</p>}
          {!studentsLoading && !studentsError && <table className="mentor-students-table"><thead><tr><th>Student</th><th>Grade</th><th>Attendance</th><th>Progress</th><th>Status</th><th /></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td><strong>{student.name}</strong><span>{student.email || student.id}</span></td><td>{student.grade}</td><td>{student.attendance ?? 0}%</td><td><div className="mentor-table-progress"><span>{student.overallProgress ?? 0}%</span><div className="mentor-progress-track"><span style={{ width: `${student.overallProgress ?? 0}%` }} /></div></div></td><td><span className={`mentor-risk ${(student.status || 'New').toLowerCase().replace(' ', '-')}`}>{student.status || 'New'}</span></td><td><button className="mentor-link-button" type="button" onClick={() => onViewStudent(student)}>View details</button></td></tr>)}</tbody></table>}
        </div>
      </section>
    </div>
  )
}

export default MentorStudents
