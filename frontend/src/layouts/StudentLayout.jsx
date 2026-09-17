import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { student } from '../data/dummyData'
import { getCurrentUser } from '../utils/auth'

function StudentLayout() {
  const currentUser = getCurrentUser()
  const studentName = currentUser?.role === 'student' && currentUser.name ? currentUser.name : student.name
  const studentEmail = currentUser?.role === 'student' && currentUser.email ? currentUser.email : ''

  return (
    <div className="app-shell">
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Navbar studentName={studentName} studentEmail={studentEmail} />
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout
