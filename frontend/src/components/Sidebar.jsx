import { NavLink } from 'react-router-dom'
const defaultLinks = [
	{ to: '/student/dashboard', label: 'Dashboard', icon: '⌂' },
	{ to: '/student/sessions', label: 'Sessions', icon: '▣' },
	{ to: '/student/resources', label: 'Learning Resources', icon: '▤' },
	{ to: '/student/progress', label: 'Progress', icon: '↗' },
]

function Sidebar({ links = defaultLinks }) {
	return (
		<aside className="sidebar">
			<nav aria-label="Main navigation">
				<p className="nav-label">LEARNING HUB</p>
				{links.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
					>
						<span className="nav-icon" aria-hidden="true">{link.icon}</span>
						{link.label}
					</NavLink>
				))}
			</nav>
			<div className="sidebar-help">
				<span className="help-icon">?</span>
				<strong>Need a hand?</strong>
				<p>Your mentor is here to help you reach your goals.</p>
				<button type="button">Message mentor</button>
			</div>
		</aside>
	)
}

export default Sidebar