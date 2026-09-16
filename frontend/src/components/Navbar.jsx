function getInitials(name) {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase()
}

function Navbar({ studentName = 'Student', onLogout }) {
	return (
		<header className="topbar">
			<a className="brand" href="/student/dashboard" aria-label="EduBridge dashboard">
				<span className="brand-mark">E</span>
				<span>Edu<span>Bridge</span></span>
			</a>
			<div className="topbar-actions">
				<div className="profile-summary">
					<span className="avatar avatar-small">{getInitials(studentName)}</span>
					<span className="profile-name">{studentName}</span>
				</div>
				<button className="logout-button" type="button" onClick={onLogout}>Log out</button>
			</div>
		</header>
	)
}

export default Navbar