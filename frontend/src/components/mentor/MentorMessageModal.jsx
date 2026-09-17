import { useEffect, useState } from 'react'
import { getRegisteredStudents, getUserId } from '../../utils/auth'

function MentorMessageModal({ mentor, messages, selectedStudent, isLoading, error, isOpen, onClose, onRefresh, onSend }) {
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const registeredStudents = isOpen ? getRegisteredStudents(mentor) : []
  const activeStudentId = selectedStudent ? getUserId(selectedStudent) : selectedStudentId || getUserId(registeredStudents[0])
  const currentStudent = registeredStudents.find((student) => getUserId(student) === activeStudentId)
  const mentorId = getUserId(mentor)
  const conversation = messages.filter((item) => currentStudent && ((item.senderId === mentorId && item.receiverId === getUserId(currentStudent)) || (item.senderId === getUserId(currentStudent) && item.receiverId === mentorId)))

  useEffect(() => {
    if (!isOpen) return undefined
    const timeoutId = window.setTimeout(onRefresh, 0)
    return () => window.clearTimeout(timeoutId)
  }, [isOpen, onRefresh])

  if (!isOpen) return null

  async function handleSubmit(event) {
    event.preventDefault()
    if (!currentStudent || !message.trim() || isSending) return

    setIsSending(true)
    try {
      await onSend({
        senderId: mentor.id,
        senderName: mentor.name,
        receiverId: String(currentStudent.id),
        receiverName: currentStudent.name,
        message: message.trim(),
      })
      setMessage('')
      await onRefresh()
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-panel message-modal" role="dialog" aria-modal="true" aria-labelledby="mentor-messages-title">
        <div className="modal-heading"><div><p className="mentor-eyebrow">COMMUNICATION</p><h2 id="mentor-messages-title">Student messages</h2></div><button className="modal-close" type="button" onClick={onClose} aria-label="Close messages">×</button></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <label htmlFor="conversation-student">Conversation</label>
        <select id="conversation-student" className="conversation-select" value={activeStudentId} onChange={(event) => setSelectedStudentId(event.target.value)}><option value="">Select a student</option>{registeredStudents.map((student) => <option value={getUserId(student)} key={getUserId(student)}>{student.name} · {student.email}</option>)}</select>
        <div className="message-list" aria-live="polite">
          {isLoading && <p className="modal-muted">Loading messages...</p>}
          {!isLoading && currentStudent && conversation.length === 0 && <p className="modal-muted">No messages with this student yet.</p>}
          {conversation.map((item) => <div className={`message-bubble ${item.senderId === mentorId ? 'sent' : 'received'}`} key={item.id}><strong>{item.senderId === mentorId ? 'You' : item.senderName}</strong><p>{item.message}</p><small>{new Date(item.timestamp).toLocaleString()}</small></div>)}
        </div>
        <form className="message-form" onSubmit={handleSubmit}><label htmlFor="student-message">Reply</label><textarea id="student-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a reply..." rows="3" disabled={isSending || !currentStudent} required /><button className="primary-button" type="submit" disabled={isSending || !currentStudent || !message.trim()}>{isSending ? 'Sending...' : 'Send reply'}</button></form>
      </section>
    </div>
  )
}

export default MentorMessageModal
