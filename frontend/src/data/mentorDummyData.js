export const mentor = {
  id: 'MTR-1001',
  name: 'Dr. Priya Sharma',
  role: 'Science & Mathematics Mentor',
  initials: 'PS',
}

export const mentorStats = {
  assignedStudents: 24,
  activeStudents: 19,
  sessionsThisWeek: 12,
  averageProgress: 68,
}

export const assignedStudents = [
  { id: 'STU-1001', name: 'Aarav Mehta', grade: 'Class 10', attendance: 92, progress: 78, status: 'On track' },
  { id: 'STU-1002', name: 'Ishita Rao', grade: 'Class 9', attendance: 88, progress: 71, status: 'On track' },
  { id: 'STU-1003', name: 'Kabir Singh', grade: 'Class 10', attendance: 73, progress: 54, status: 'Needs support' },
  { id: 'STU-1004', name: 'Meera Nair', grade: 'Class 8', attendance: 96, progress: 84, status: 'Excellent' },
  { id: 'STU-1005', name: 'Vivaan Shah', grade: 'Class 9', attendance: 66, progress: 42, status: 'At risk' },
]

export const upcomingMentorSessions = [
  { id: 'MSES-2001', studentName: 'Aarav Mehta', date: '18 June 2024', time: '4:00 PM - 5:00 PM', topic: 'Quadratic Equations', status: 'upcoming' },
  { id: 'MSES-2002', studentName: 'Kabir Singh', date: '19 June 2024', time: '5:00 PM - 6:00 PM', topic: 'Motion and Forces', status: 'upcoming' },
  { id: 'MSES-2003', studentName: 'Meera Nair', date: '20 June 2024', time: '4:30 PM - 5:30 PM', topic: 'Exam Preparation', status: 'upcoming' },
]

export const completedMentorSessions = [
  { id: 'MSES-1998', studentName: 'Ishita Rao', date: '15 June 2024', time: '11:00 AM - 12:00 PM', topic: 'Linear Equations', status: 'completed' },
  { id: 'MSES-1999', studentName: 'Vivaan Shah', date: '13 June 2024', time: '5:00 PM - 6:00 PM', topic: 'Chemical Reactions', status: 'completed' },
  { id: 'MSES-2000', studentName: 'Aarav Mehta', date: '10 June 2024', time: '4:30 PM - 5:30 PM', topic: 'Trigonometry Basics', status: 'completed' },
]

export const studentProgress = [
  { id: 'PROG-1001', studentName: 'Aarav Mehta', attendance: 92, completedResources: 14, sessionsAttended: 11, subjects: [{ name: 'Mathematics', progress: 78 }, { name: 'Science', progress: 72 }, { name: 'English', progress: 84 }] },
  { id: 'PROG-1002', studentName: 'Ishita Rao', attendance: 88, completedResources: 11, sessionsAttended: 9, subjects: [{ name: 'Mathematics', progress: 71 }, { name: 'Science', progress: 67 }, { name: 'English', progress: 75 }] },
  { id: 'PROG-1003', studentName: 'Kabir Singh', attendance: 73, completedResources: 7, sessionsAttended: 8, subjects: [{ name: 'Mathematics', progress: 54 }, { name: 'Science', progress: 49 }, { name: 'English', progress: 60 }] },
]

export const recentActivity = [
  { id: 'ACT-1', text: 'Meera Nair completed the Algebra practice set.', time: '35 minutes ago' },
  { id: 'ACT-2', text: 'Ishita Rao attended a mentoring session.', time: '2 hours ago' },
  { id: 'ACT-3', text: 'Kabir Singh submitted a question about Physics.', time: 'Yesterday' },
]
