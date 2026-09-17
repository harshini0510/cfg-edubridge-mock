import { useCallback, useEffect, useState } from 'react'
import { getRegisteredMentors, getUserId } from '../utils/auth'

function MessageMentorModal({ student, isOpen, onClose }) {
  const [selectedMentorId, setSelectedMentorId] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')

  const studentId = getUserId(student)
  const mentors = isOpen ? getRegisteredMentors(student) : []
  const selectedMentor = mentors.find((user) => getUserId(user) === selectedMentorId) || mentors[0]

  const fetchMessages = useCallback(async () => {
    if (!studentId) return

    setIsLoading(true)
    setError('')
    try {
      const userId = encodeURIComponent(studentId)
      const response = await fetch(`http://localhost:5000/api/messages?userId=${userId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load messages.')
      }

      setMessages(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setIsLoading(false)
    }
  }, [studentId])

  useEffect(() => {
    if (!isOpen) return undefined

    const timeoutId = window.setTimeout(fetchMessages, 0)
    return () => window.clearTimeout(timeoutId)
  }, [isOpen, fetchMessages, studentId])

  if (!isOpen) return null

  async function handleSubmit(event) {
    event.preventDefault()
    if (!selectedMentor || !message.trim() || isSending) return

    setIsSending(true)
    setError('')
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: studentId,
          senderName: student.name,
          receiverId: getUserId(selectedMentor),
          receiverName: selectedMentor.name,
          message: message.trim(),
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send message.')
      }

      setMessage('')
      await fetchMessages()
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-panel message-modal" role="dialog" aria-modal="true" aria-labelledby="message-mentor-title">
        <div className="modal-heading">
          <div><p className="eyebrow blue-text">MENTOR CHAT</p><h2 id="message-mentor-title">Message a mentor</h2></div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close messages">×</button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <label htmlFor="student-mentor">Mentor</label>
        <select id="student-mentor" className="conversation-select" value={selectedMentor ? getUserId(selectedMentor) : ''} onChange={(event) => setSelectedMentorId(event.target.value)}>
          <option value="">Select a mentor</option>
          {mentors.map((user) => <option value={getUserId(user)} key={getUserId(user)}>{user.name} · {user.email}</option>)}
        </select>
        <div className="message-list" aria-live="polite">
          {isLoading && <p className="modal-muted">Loading messages...</p>}
          {!isLoading && !selectedMentor && <p className="modal-muted">Select a registered mentor to view your conversation.</p>}
          {!isLoading && selectedMentor && messages.filter((item) => (item.senderId === studentId && item.receiverId === getUserId(selectedMentor)) || (item.senderId === getUserId(selectedMentor) && item.receiverId === studentId)).length === 0 && <p className="modal-muted">No messages yet. Start the conversation.</p>}
          {messages.filter((item) => selectedMentor && ((item.senderId === studentId && item.receiverId === getUserId(selectedMentor)) || (item.senderId === getUserId(selectedMentor) && item.receiverId === studentId))).map((item) => {
            const isCurrentUser = item.senderId === studentId
            return <div className={`message-bubble ${isCurrentUser ? 'sent' : 'received'}`} key={item.id}><strong>{isCurrentUser ? 'You' : item.senderName}</strong><p>{item.message}</p></div>
          })}
        </div>
        <form className="message-form" onSubmit={handleSubmit}>
          <label htmlFor="mentor-message">Message</label>
          <textarea id="mentor-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message..." rows="3" disabled={isSending} required />
          <button className="primary-button" type="submit" disabled={isSending || !selectedMentor || !message.trim()}>{isSending ? 'Sending...' : 'Send message'}</button>
        </form>
      </section>
    </div>
  )
}

export default MessageMentorModal
