import { useState } from 'react'

const initialForm = { studentName: '', studentEmail: '', grade: '' }

function AddStudentModal({ mentor, isOpen, onClose, onAdded }) {
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
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch('http://localhost:5000/api/mentor/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mentorId: mentor.id, ...form }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to add student.')
      setSuccess('Student added successfully.')
      await onAdded()
      window.setTimeout(closeModal, 700)
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="add-student-title">
        <div className="modal-heading"><div><p className="mentor-eyebrow">NEW STUDENT</p><h2 id="add-student-title">Add student</h2></div><button className="modal-close" type="button" onClick={closeModal} aria-label="Close add student form">×</button></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        {success && <p className="form-success" role="status">{success}</p>}
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="student-name">Student name</label><input id="student-name" name="studentName" value={form.studentName} onChange={(event) => setForm({ ...form, studentName: event.target.value })} required />
          <label htmlFor="student-email">Student email</label><input id="student-email" name="studentEmail" type="email" value={form.studentEmail} onChange={(event) => setForm({ ...form, studentEmail: event.target.value })} required />
          <label htmlFor="student-grade">Grade</label><input id="student-grade" name="grade" value={form.grade} onChange={(event) => setForm({ ...form, grade: event.target.value })} placeholder="Class 10" required />
          <div className="modal-actions"><button className="secondary-button" type="button" onClick={closeModal}>Cancel</button><button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add student'}</button></div>
        </form>
      </section>
    </div>
  )
}

export default AddStudentModal
