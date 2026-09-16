import ResourceCard from '../components/ResourceCard'
import { learningResources } from '../data/dummyData'

function Resources() {
	return (
		<div className="page">
			<div className="page-heading">
				<div>
					<p className="eyebrow blue-text">YOUR LIBRARY</p>
					<h1>Learning resources</h1>
					<p className="page-intro">Helpful material, ready whenever you are.</p>
				</div>
			</div>

			<section className="resource-grid">
				{learningResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
			</section>
		</div>
	)
}

export default Resources