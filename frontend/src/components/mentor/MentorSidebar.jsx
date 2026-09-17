import { NavLink } from 'react-router-dom'

const links = [
  { to: '/mentor/dashboard', label: 'Dashboard', icon: '⌂' },
  { to: '/mentor/students', label: 'My Students', icon: '◉' },
  { to: '/mentor/sessions', label: 'Sessions', icon: '▣' },
  { to: '/mentor/progress', label: 'Student Progress', icon: '↗' },
]

function MentorSidebar() {
  return (
    <aside className="mentor-sidebar">
      <nav aria-label="Mentor navigation">
        <p className="mentor-nav-label">MENTOR WORKSPACE</p>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'mentor-nav-link active' : 'mentor-nav-link'}>
            <span className="mentor-nav-icon" aria-hidden="true">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mentor-sidebar-note">
        <strong>Keep making a difference</strong>
        <p>Your guidance helps students build a brighter future.</p>
      </div>
    </aside>
  )
}

export default MentorSidebar
