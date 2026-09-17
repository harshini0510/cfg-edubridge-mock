import { Outlet } from 'react-router-dom'
import MentorNavbar from '../components/mentor/MentorNavbar'
import MentorSidebar from '../components/mentor/MentorSidebar'
import { mentor } from '../data/mentorDummyData'
import { getCurrentUser } from '../utils/auth'

function MentorLayout() {
  const currentUser = getCurrentUser()
  const mentorName = currentUser?.role === 'mentor' && currentUser.name ? currentUser.name : mentor.name
  const mentorEmail = currentUser?.role === 'mentor' && currentUser.email ? currentUser.email : ''

  return (
    <div className="mentor-shell">
      <MentorSidebar />
      <div className="mentor-main">
        <MentorNavbar mentorName={mentorName} mentorEmail={mentorEmail} />
        <main><Outlet /></main>
      </div>
    </div>
  )
}

export default MentorLayout
