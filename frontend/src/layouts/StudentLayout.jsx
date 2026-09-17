import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MessageMentorModal from '../components/MessageMentorModal'
import Sidebar from '../components/Sidebar'
import StudentSessionModal from '../components/StudentSessionModal'
import { getCurrentUser } from '../utils/auth'

function StudentLayout() {
  const [backendStudent, setBackendStudent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [sessions, setSessions] = useState([])
  const [sessionsLoading, setSessionsLoading] = useState(true)
  const [sessionsError, setSessionsError] = useState('')
  const [activeModal, setActiveModal] = useState('')
  const loggedInUser = getCurrentUser()

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await fetch('http://localhost:5000/api/student')

        if (!response.ok) {
          throw new Error('Unable to load student information.')
        }

        const studentData = await response.json()
        setBackendStudent(studentData && typeof studentData === 'object' ? studentData : null)
      } catch (requestError) {
        setError(requestError.message || 'Unable to connect to the backend.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudent()
  }, [])

  const student = {
    id: loggedInUser?.id || loggedInUser?.email || (backendStudent?.id ? String(backendStudent.id) : ''),
    name: loggedInUser?.name || 'Student',
    email: loggedInUser?.email || '',
    role: loggedInUser?.role || '',
    grade: backendStudent?.grade,
    attendance: backendStudent?.attendance,
    overallProgress: backendStudent?.overallProgress,
  }

  useEffect(() => {
    let isCurrent = true

    async function fetchSessions() {
      if (!student.id) {
        setSessions([])
        setSessionsLoading(false)
        return
      }

      setSessionsLoading(true)
      setSessionsError('')
      try {
        const response = await fetch(`http://localhost:5000/api/sessions?studentId=${encodeURIComponent(student.id)}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load sessions.')
        }

        if (isCurrent) setSessions(Array.isArray(data) ? data : [])
      } catch (requestError) {
        if (isCurrent) setSessionsError(requestError.message || 'Unable to connect to the backend.')
      } finally {
        if (isCurrent) setSessionsLoading(false)
      }
    }

    fetchSessions()
    return () => { isCurrent = false }
  }, [student.id])

  async function refreshSessions() {
    if (!student.id) return

    setSessionsLoading(true)
    setSessionsError('')
    try {
      const response = await fetch(`http://localhost:5000/api/sessions?studentId=${encodeURIComponent(student.id)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load sessions.')
      }

      setSessions(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setSessionsError(requestError.message || 'Unable to connect to the backend.')
    } finally {
      setSessionsLoading(false)
    }
  }

  const outletContext = {
    student,
    isLoading,
    error,
    sessions,
    sessionsLoading,
    sessionsError,
    refreshSessions,
    onOpenBooking: () => setActiveModal('booking'),
    onOpenMessage: () => setActiveModal('message'),
  }

  return (
    <div className="app-shell">
      <div className="app-body">
        <Sidebar onMessageMentor={() => setActiveModal('message')} />
        <main className="main-content">
          <Navbar studentName={student.name} studentEmail={student.email} />
          <Outlet context={outletContext} />
        </main>
      </div>
      <StudentSessionModal student={student} isOpen={activeModal === 'booking'} onClose={() => setActiveModal('')} onBooked={refreshSessions} />
      <MessageMentorModal student={student} isOpen={activeModal === 'message'} onClose={() => setActiveModal('')} />
    </div>
  )
}

export default StudentLayout
