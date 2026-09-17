function StudentDetailsModal({ student, sessions, progress, isOpen, onClose, onMessage }) {
  if (!isOpen || !student) return null

  const studentSessions = sessions.filter((session) => String(session.studentId) === String(student.id))
  const studentProgress = progress?.subjects || []

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="student-details-title">
        <div className="modal-heading"><div><p className="mentor-eyebrow">STUDENT PROFILE</p><h2 id="student-details-title">{student.name}</h2></div><button className="modal-close" type="button" onClick={onClose} aria-label="Close student details">×</button></div>
        <div className="mentor-detail-stats"><div><span>Grade</span><strong>{student.grade || '-'}</strong></div><div><span>Attendance</span><strong>{student.attendance ?? 0}%</strong></div><div><span>Progress</span><strong>{student.overallProgress ?? 0}%</strong></div></div>
        <p className="modal-muted">{student.email || 'No email available'}</p>
        <h3 className="details-subheading">Subject progress</h3>
        <div className="mentor-subject-list">{studentProgress.length ? studentProgress.map((subject) => <div className="mentor-subject-row" key={subject.name || subject.subject}><div><span>{subject.name || subject.subject}</span><strong>{subject.progress}%</strong></div><div className="mentor-progress-track"><span style={{ width: `${subject.progress}%` }} /></div></div>) : <p className="modal-muted">No subject progress available.</p>}</div>
        <h3 className="details-subheading">Sessions</h3>
        {studentSessions.length ? <div className="details-session-list">{studentSessions.map((session) => <p key={session.id}><strong>{session.topic}</strong> · {session.date} · {session.status}</p>)}</div> : <p className="modal-muted">No sessions recorded.</p>}
        <div className="modal-actions"><button className="secondary-button" type="button" onClick={() => onMessage(student)}>Message student</button><button className="primary-button" type="button" onClick={onClose}>Close</button></div>
      </section>
    </div>
  )
}

export default StudentDetailsModal
