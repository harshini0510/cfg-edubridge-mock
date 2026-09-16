import { Outlet } from 'react-router-dom'
import MentorNavbar from '../components/mentor/MentorNavbar'
import MentorSidebar from '../components/mentor/MentorSidebar'
import { mentor } from '../data/mentorDummyData'

function MentorLayout() {
  return (
    <div className="mentor-shell">
      <MentorSidebar />
      <div className="mentor-main">
        <MentorNavbar mentorName={mentor.name} />
        <main><Outlet /></main>
      </div>
    </div>
  )
}

export default MentorLayout
