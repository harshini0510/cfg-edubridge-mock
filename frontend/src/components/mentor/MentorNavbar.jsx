function getInitials(name) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
}

function MentorNavbar({ mentorName = 'Mentor', mentorEmail = '', onLogout }) {
  return (
    <header className="mentor-topbar">
      <a className="mentor-brand" href="/mentor/dashboard" aria-label="EduBridge mentor dashboard">
        <span className="mentor-brand-mark">E</span>
        <span>Edu<span>Bridge</span></span>
      </a>
      <div className="mentor-topbar-actions">
        <div className="mentor-profile-summary">
          <span className="mentor-avatar">{getInitials(mentorName)}</span>
          <div><strong>{mentorName}</strong><span>{mentorEmail || 'Mentor account'}</span></div>
        </div>
        <button className="mentor-logout" type="button" onClick={onLogout}>Log out</button>
      </div>
    </header>
  )
}

export default MentorNavbar
