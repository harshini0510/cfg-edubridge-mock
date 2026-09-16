import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { student } from '../data/dummyData'

function StudentLayout() {
  return (
    <div className="app-shell">
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Navbar studentName={student.name} />
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout
