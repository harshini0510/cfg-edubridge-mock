import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AddStudentModal from '../components/mentor/AddStudentModal'
import MentorMessageModal from '../components/mentor/MentorMessageModal'
import MentorNavbar from '../components/mentor/MentorNavbar'
import ScheduleSessionModal from '../components/mentor/ScheduleSessionModal'
import StudentDetailsModal from '../components/mentor/StudentDetailsModal'
import MentorSidebar from '../components/mentor/MentorSidebar'
import { mentor as dummyMentor } from '../data/mentorDummyData'
import { getCurrentUser } from '../utils/auth'

function MentorLayout() {
  const currentUser = getCurrentUser()
  const mentor = {
    id: currentUser?.role === 'mentor' ? currentUser.id || currentUser.email : dummyMentor.id,
    name: currentUser?.role === 'mentor' && currentUser.name ? currentUser.name : dummyMentor.name,
    email: currentUser?.role === 'mentor' ? currentUser.email || '' : '',
    role: currentUser?.role || '',
  }
  const [students, setStudents] = useState([])
  const [sessions, setSessions] = useState([])
  const [messages, setMessages] = useState([])
  const [progress, setProgress] = useState([])
  const [studentsLoading, setStudentsLoading] = useState(true)
  const [sessionsLoading, setSessionsLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [studentsError, setStudentsError] = useState('')
  const [sessionsError, setSessionsError] = useState('')
  const [messagesError, setMessagesError] = useState('')
  const [activeModal, setActiveModal] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)

  const fetchStudents = useCallback(async () => {
    setStudentsLoading(true)
    setStudentsError('')
    try {
      const response = await fetch(`http://localhost:5000/api/mentor/students?mentorId=${encodeURIComponent(mentor.id)}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to load students.')
      setStudents(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setStudentsError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setStudentsLoading(false)
    }
  }, [mentor.id])

  const fetchSessions = useCallback(async () => {
    setSessionsLoading(true)
    setSessionsError('')
    try {
      const response = await fetch(`http://localhost:5000/api/mentor/sessions?mentorId=${encodeURIComponent(mentor.id)}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to load sessions.')
      setSessions(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setSessionsError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setSessionsLoading(false)
    }
  }, [mentor.id])

  const fetchMessages = useCallback(async () => {
    setMessagesLoading(true)
    setMessagesError('')
    try {
      const response = await fetch(`http://localhost:5000/api/messages?userId=${encodeURIComponent(mentor.id)}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to load messages.')
      setMessages(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setMessagesError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setMessagesLoading(false)
    }
  }, [mentor.id])

  const fetchProgress = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentor/progress')
      const data = await response.json()
      if (response.ok) setProgress(Array.isArray(data) ? data : [])
    } catch {
      setProgress([])
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      fetchStudents()
      fetchSessions()
      fetchMessages()
      fetchProgress()
    }, 0)
    return () => window.clearTimeout(timeoutId)
  }, [fetchStudents, fetchSessions, fetchMessages, fetchProgress])

  async function sendMessage(payload) {
    const response = await fetch('http://localhost:5000/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Unable to send message.')
  }

  const outletContext = {
    mentor,
    students,
    sessions,
    messages,
    progress,
    studentsLoading,
    sessionsLoading,
    messagesLoading,
    studentsError,
    sessionsError,
    messagesError,
    refreshStudents: fetchStudents,
    refreshSessions: fetchSessions,
    refreshMessages: fetchMessages,
    onOpenAddStudent: () => setActiveModal('add-student'),
    onOpenSchedule: () => setActiveModal('schedule'),
    onOpenMessages: (student = null) => { setSelectedStudent(student); setActiveModal('messages') },
    onViewStudent: (student) => { setSelectedStudent(student); setActiveModal('details') },
  }

  return (
    <div className="mentor-shell">
      <MentorSidebar />
      <div className="mentor-main">
        <MentorNavbar mentorName={mentor.name} mentorEmail={mentor.email} />
        <main><Outlet context={outletContext} /></main>
      </div>
      <AddStudentModal mentor={mentor} isOpen={activeModal === 'add-student'} onClose={() => setActiveModal('')} onAdded={fetchStudents} />
      <ScheduleSessionModal mentor={mentor} students={students} isOpen={activeModal === 'schedule'} onClose={() => setActiveModal('')} onScheduled={fetchSessions} />
      <MentorMessageModal mentor={mentor} selectedStudent={selectedStudent} messages={messages} isLoading={messagesLoading} error={messagesError} isOpen={activeModal === 'messages'} onClose={() => setActiveModal('')} onRefresh={fetchMessages} onSend={sendMessage} />
      <StudentDetailsModal student={selectedStudent} sessions={sessions} progress={progress.find((item) => String(item.studentId) === String(selectedStudent?.id))} isOpen={activeModal === 'details'} onClose={() => setActiveModal('')} onMessage={(student) => { setSelectedStudent(student); setActiveModal('messages') }} />
    </div>
  )
}

export default MentorLayout
