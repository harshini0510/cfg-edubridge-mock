export const student = {
  id: 'STU-1001',
  name: 'Aarav Mehta',
  course: 'Secondary School Education',
  year: 'Class 10',
  attendance: 92,
  mentor: 'Dr. Priya Sharma',
  overallProgress: 72,
}

export const upcomingSessions = [
  { id: 'SES-2001', subject: 'Mathematics: Quadratic Equations', mentor: 'Dr. Priya Sharma', date: '18 June 2024', time: '4:00 PM - 5:00 PM', mode: 'Video call', status: 'upcoming' },
  { id: 'SES-2002', subject: 'Physics: Motion and Forces', mentor: 'Karan Malhotra', date: '20 June 2024', time: '5:00 PM - 6:00 PM', mode: 'Video call', status: 'upcoming' },
  { id: 'SES-2003', subject: 'Exam Preparation Check-in', mentor: 'Dr. Priya Sharma', date: '22 June 2024', time: '11:00 AM - 11:30 AM', mode: 'In person', status: 'upcoming' },
]

export const completedSessions = [
  { id: 'SES-1998', subject: 'Mathematics: Introduction to Trigonometry', mentor: 'Dr. Priya Sharma', date: '15 June 2024', time: '11:00 AM - 12:00 PM', mode: 'Video call', status: 'completed' },
  { id: 'SES-1999', subject: 'Chemistry: The Periodic Table', mentor: 'Nisha Kapoor', date: '13 June 2024', time: '5:00 PM - 6:00 PM', mode: 'In person', status: 'completed' },
  { id: 'SES-2000', subject: 'English: Writing Skills Workshop', mentor: 'Rohan Desai', date: '10 June 2024', time: '4:30 PM - 5:30 PM', mode: 'Video call', status: 'completed' },
]

export const learningResources = [
  { id: 'RES-3001', title: 'Quadratic Equations: Practice Set', type: 'Worksheet', category: 'Mathematics', progress: 70 },
  { id: 'RES-3002', title: 'Forces and Laws of Motion', type: 'Video lesson', category: 'Physics', progress: 45 },
  { id: 'RES-3003', title: 'The Periodic Table', type: 'Reading material', category: 'Chemistry', progress: 100 },
  { id: 'RES-3004', title: 'English Grammar Essentials', type: 'Interactive quiz', category: 'English', progress: 25 },
]

export const subjectProgress = [
  { id: 'SUB-4001', subject: 'Mathematics', progress: 78 },
  { id: 'SUB-4002', subject: 'Science', progress: 64 },
  { id: 'SUB-4003', subject: 'English', progress: 86 },
  { id: 'SUB-4004', subject: 'Social Studies', progress: 52 },
]

// Compatibility exports for the existing student dashboard components.
export const attendance = { percentage: student.attendance, attended: 23, total: 25 }
export const mentor = { name: student.mentor, role: 'Science & Mathematics Mentor', initials: 'PS', nextAvailable: 'Today, 4:30 PM' }
export const resources = learningResources.map((resource) => ({ ...resource, subject: resource.category, accent: 'blue' }))