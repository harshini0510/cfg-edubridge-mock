export const student = { name: 'Aarav Mehta', firstName: 'Aarav', grade: 'Class 10', school: 'Riverside Community School', initials: 'AM' }
export const attendance = { percentage: 92, attended: 23, total: 25 }
export const mentor = { name: 'Dr. Priya Sharma', role: 'Science & Mathematics Mentor', initials: 'PS', nextAvailable: 'Today, 4:30 PM' }
export const upcomingSessions = [
  { id: 1, title: 'Algebra: Quadratic Equations', date: 'Tue, 18 Jun', time: '4:00 PM - 5:00 PM', type: 'Mentoring session', mentor: 'Dr. Priya Sharma', status: 'upcoming' },
  { id: 2, title: 'Physics: Motion & Forces', date: 'Thu, 20 Jun', time: '5:00 PM - 6:00 PM', type: 'Study group', mentor: 'Karan Malhotra', status: 'upcoming' },
  { id: 3, title: 'Exam Preparation Check-in', date: 'Sat, 22 Jun', time: '11:00 AM - 11:30 AM', type: 'Mentoring session', mentor: 'Dr. Priya Sharma', status: 'upcoming' },
]
export const completedSessions = [
  { id: 4, title: 'Introduction to Trigonometry', date: 'Sat, 15 Jun', time: '11:00 AM - 12:00 PM', type: 'Mentoring session', mentor: 'Dr. Priya Sharma', status: 'completed' },
  { id: 5, title: 'Chemistry: The Periodic Table', date: 'Thu, 13 Jun', time: '5:00 PM - 6:00 PM', type: 'Study group', mentor: 'Nisha Kapoor', status: 'completed' },
]
export const resources = [
  { id: 1, title: 'Quadratic Equations: Practice Set', type: 'Worksheet', subject: 'Mathematics', progress: 70, accent: 'blue' },
  { id: 2, title: 'Forces and Laws of Motion', type: 'Video lesson', subject: 'Physics', progress: 45, accent: 'green' },
  { id: 3, title: 'The Periodic Table', type: 'Reading material', subject: 'Chemistry', progress: 100, accent: 'yellow' },
  { id: 4, title: 'English Grammar Essentials', type: 'Interactive quiz', subject: 'English', progress: 25, accent: 'purple' },
]
export const subjectProgress = [
  { subject: 'Mathematics', score: 78, detail: 'On track', color: 'blue' }, { subject: 'Science', score: 64, detail: 'Keep going', color: 'green' },
  { subject: 'English', score: 86, detail: 'Strong progress', color: 'yellow' }, { subject: 'Social Studies', score: 52, detail: 'Needs attention', color: 'orange' },
]