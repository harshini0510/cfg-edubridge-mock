import { student, subjectProgress } from '../data/dummyData'

function Progress() {
	return (
		<div className="page">
			<div className="page-heading">
				<div>
					<p className="eyebrow blue-text">YOUR LEARNING JOURNEY</p>
					<h1>Progress overview</h1>
					<p className="page-intro">Small steps add up to big milestones.</p>
				</div>
			</div>

			<section className="overall-progress">
				<div>
					<p className="eyebrow">OVERALL LEARNING PROGRESS</p>
					<strong>{student.overallProgress}%</strong>
					<p>You are making steady progress across your subjects.</p>
				</div>
				<div className="overall-ring"><span>{student.overallProgress}<small>%</small></span></div>
			</section>

			<section className="content-section full-section">
				<div className="section-heading"><div><h2>Subject progress</h2><p>Your latest progress by subject.</p></div></div>
				<div className="subject-progress-list">
					{subjectProgress.map((item) => (
						<div className="subject-progress-row" key={item.id}>
							<div className="subject-heading"><strong>{item.subject}</strong><span>{item.progress}% complete</span></div>
							<div className="progress-track" aria-label={`${item.subject}: ${item.progress}% complete`}>
								<span style={{ width: `${item.progress}%` }} />
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default Progress