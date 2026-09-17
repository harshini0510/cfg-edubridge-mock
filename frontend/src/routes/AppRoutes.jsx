import { Navigate, Route, Routes } from 'react-router-dom'
import StudentDashboard from '../pages/StudentDashboard'
import Sessions from '../pages/Sessions'
import Resources from '../pages/Resources'
import Progress from '../pages/Progress'
import StudentLayout from '../layouts/StudentLayout'
import MentorLayout from '../layouts/MentorLayout'
import MentorDashboard from '../pages/mentor/MentorDashboard'
import MentorStudents from '../pages/mentor/MentorStudents'
import MentorSessions from '../pages/mentor/MentorSessions'
import MentorProgress from '../pages/mentor/MentorProgress'
import Login from '../pages/Login'
import Register from '../pages/Register'

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/student" element={<StudentLayout />}>
				<Route path="dashboard" element={<StudentDashboard />} />
				<Route path="sessions" element={<Sessions />} />
				<Route path="resources" element={<Resources />} />
				<Route path="progress" element={<Progress />} />
			</Route>
			<Route path="/mentor" element={<MentorLayout />}>
				<Route path="dashboard" element={<MentorDashboard />} />
				<Route path="students" element={<MentorStudents />} />
				<Route path="sessions" element={<MentorSessions />} />
				<Route path="progress" element={<MentorProgress />} />
			</Route>
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	)
}

export default AppRoutes