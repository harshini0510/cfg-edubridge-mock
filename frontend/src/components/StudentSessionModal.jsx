import { useState } from 'react'
import { getRegisteredMentors, getUserId } from '../utils/auth'

const initialForm = {
  mentorId: '',
  mentorName: '',
  date: '',
  time: '',
  topic: '',
}

function StudentSessionModal({ student, isOpen, onClose, onBooked }) {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const mentors = isOpen ? getRegisteredMentors(student) : []
  const selectedMentor = mentors.find((mentor) => getUserId(mentor) === form.mentorId)

  if (!isOpen) return null

  function closeModal() {
    setForm(initialForm)
    setError('')
    setSuccess('')
    onClose()
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:5000/api/sessions/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id || student.email,
          studentName: student.name,
          ...form,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to book the session.')
      }

      setSuccess('Session booked successfully.')
      await onBooked()
      window.setTimeout(closeModal, 700)
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="book-session-title">
        <div className="modal-heading">
          <div><p className="eyebrow blue-text">NEW APPOINTMENT</p><h2 id="book-session-title">Book a session</h2></div>
          <button className="modal-close" type="button" onClick={closeModal} aria-label="Close booking form">×</button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        {success && <p className="form-success" role="status">{success}</p>}
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="session-mentor">Mentor</label>
          <select id="session-mentor" name="mentorId" value={form.mentorId} onChange={(event) => { const mentor = mentors.find((item) => getUserId(item) === event.target.value); setForm((currentForm) => ({ ...currentForm, mentorId: event.target.value, mentorName: mentor?.name || '' })) }} required>
            <option value="">Select a mentor</option>
            {mentors.map((mentor) => <option value={getUserId(mentor)} key={getUserId(mentor)}>{mentor.name} · {mentor.email}</option>)}
          </select>
          <label htmlFor="session-date">Date</label>
          <input id="session-date" name="date" type="date" value={form.date} onChange={handleChange} required />
          <label htmlFor="session-time">Time</label>
          <input id="session-time" name="time" type="time" value={form.time} onChange={handleChange} required />
          <label htmlFor="session-topic">Topic</label>
          <input id="session-topic" name="topic" type="text" value={form.topic} onChange={handleChange} placeholder="What would you like to discuss?" required />
          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={closeModal}>Cancel</button>
            <button className="primary-button" type="submit" disabled={isSubmitting || !selectedMentor}>{isSubmitting ? 'Booking...' : 'Book session'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default StudentSessionModal
