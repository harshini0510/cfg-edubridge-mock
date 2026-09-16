import { Navigate, Route, Routes } from 'react-router-dom'
import StudentDashboard from '../pages/StudentDashboard'
import Sessions from '../pages/Sessions'
import Resources from '../pages/Resources'
import Progress from '../pages/Progress'
function AppRoutes() { return <Routes><Route path="/" element={<Navigate to="/student/dashboard" replace />} /><Route path="/student/dashboard" element={<StudentDashboard />} /><Route path="/student/sessions" element={<Sessions />} /><Route path="/student/resources" element={<Resources />} /><Route path="/student/progress" element={<Progress />} /><Route path="*" element={<Navigate to="/student/dashboard" replace />} /></Routes> }
export default AppRoutes