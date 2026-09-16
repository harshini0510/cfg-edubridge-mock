function MentorNavbar({ mentorName = 'Mentor', onLogout }) {
  return (
    <header className="mentor-topbar">
      <a className="mentor-brand" href="/mentor/dashboard" aria-label="EduBridge mentor dashboard">
        <span className="mentor-brand-mark">E</span>
        <span>Edu<span>Bridge</span></span>
      </a>
      <div className="mentor-topbar-actions">
        <div className="mentor-profile-summary">
          <span className="mentor-avatar">PS</span>
          <div><strong>{mentorName}</strong><span>Mentor account</span></div>
        </div>
        <button className="mentor-logout" type="button" onClick={onLogout}>Log out</button>
      </div>
    </header>
  )
}

export default MentorNavbar
