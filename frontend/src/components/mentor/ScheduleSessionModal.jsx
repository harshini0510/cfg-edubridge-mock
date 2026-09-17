import { useState } from 'react'

const initialForm = { studentId: '', date: '', time: '', topic: '' }

function ScheduleSessionModal({ mentor, students, isOpen, onClose, onScheduled }) {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!isOpen) return null

  function closeModal() {
    setForm(initialForm)
    setError('')
    setSuccess('')
    onClose()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const selectedStudent = students.find((student) => String(student.id) === String(form.studentId))
    if (!selectedStudent) {
      setError('Select a student before scheduling.')
      return
    }

    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch('http://localhost:5000/api/mentor/sessions/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: String(selectedStudent.id),
          studentName: selectedStudent.name,
          mentorId: mentor.id,
          mentorName: mentor.name,
          date: form.date,
          time: form.time,
          topic: form.topic,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to schedule session.')
      setSuccess('Session scheduled successfully.')
      await onScheduled()
      window.setTimeout(closeModal, 700)
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="schedule-session-title">
        <div className="modal-heading"><div><p className="mentor-eyebrow">NEW SESSION</p><h2 id="schedule-session-title">Schedule session</h2></div><button className="modal-close" type="button" onClick={closeModal} aria-label="Close schedule form">×</button></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        {success && <p className="form-success" role="status">{success}</p>}
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="schedule-student">Student</label><select id="schedule-student" value={form.studentId} onChange={(event) => setForm({ ...form, studentId: event.target.value })} required><option value="">Select a student</option>{students.map((student) => <option value={student.id} key={student.id}>{student.name}</option>)}</select>
          <label htmlFor="schedule-date">Date</label><input id="schedule-date" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
          <label htmlFor="schedule-time">Time</label><input id="schedule-time" type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} required />
          <label htmlFor="schedule-topic">Topic</label><input id="schedule-topic" value={form.topic} onChange={(event) => setForm({ ...form, topic: event.target.value })} placeholder="Session topic" required />
          <div className="modal-actions"><button className="secondary-button" type="button" onClick={closeModal}>Cancel</button><button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Scheduling...' : 'Schedule session'}</button></div>
        </form>
      </section>
    </div>
  )
}

export default ScheduleSessionModal
