const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const student = {
	id: 1,
	name: 'Aarav Sharma',
	email: 'aarav.sharma@example.com',
	grade: 10,
	attendance: 92,
	overallProgress: 78,
};

const sessions = [
	{
		id: 1,
		title: 'Mathematics Fundamentals',
		date: '2026-09-20',
		time: '10:00 AM',
		status: 'upcoming',
	},
	{
		id: 2,
		title: 'Science Revision',
		date: '2026-09-12',
		time: '4:00 PM',
		status: 'completed',
	},
];

const resources = [
	{
		id: 1,
		title: 'Algebra Basics',
		type: 'Video',
		subject: 'Mathematics',
		url: 'https://example.com/resources/algebra-basics',
	},
	{
		id: 2,
		title: 'Introduction to Biology',
		type: 'Article',
		subject: 'Science',
		url: 'https://example.com/resources/biology-introduction',
	},
];

const progress = [
	{ subject: 'Mathematics', progress: 82 },
	{ subject: 'Science', progress: 76 },
	{ subject: 'English', progress: 74 },
];

const mentor = {
	id: 1,
	name: 'Priya Mehta',
	email: 'priya.mehta@example.com',
	specialization: 'Mathematics and Science',
};

const mentorStudents = [
	{
		id: 1,
		name: 'Aarav Sharma',
		grade: 10,
		overallProgress: 78,
	},
	{
		id: 2,
		name: 'Diya Patel',
		grade: 9,
		overallProgress: 85,
	},
];

const mentorSessions = [
	{
		id: 1,
		studentId: 1,
		studentName: 'Aarav Sharma',
		subject: 'Mathematics',
		date: '2026-09-20',
		time: '10:00 AM',
		status: 'upcoming',
	},
	{
		id: 2,
		studentId: 2,
		studentName: 'Diya Patel',
		subject: 'Science',
		date: '2026-09-14',
		time: '2:00 PM',
		status: 'completed',
	},
];

const mentorProgress = [
	{
		studentId: 1,
		studentName: 'Aarav Sharma',
		subjects: progress,
		overallProgress: 78,
	},
	{
		studentId: 2,
		studentName: 'Diya Patel',
		subjects: [
			{ subject: 'Mathematics', progress: 88 },
			{ subject: 'Science', progress: 84 },
			{ subject: 'English', progress: 83 },
		],
		overallProgress: 85,
	},
];

app.get('/api/health', (req, res) => {
	res.json({ status: 'Backend is running' });
});

app.get('/api/student', (req, res) => {
	res.json(student);
});

app.get('/api/sessions', (req, res) => {
	res.json(sessions);
});

app.get('/api/resources', (req, res) => {
	res.json(resources);
});

app.get('/api/progress', (req, res) => {
	res.json(progress);
});

app.get('/api/mentor', (req, res) => {
	res.json(mentor);
});

app.get('/api/mentor/students', (req, res) => {
	res.json(mentorStudents);
});

app.get('/api/mentor/sessions', (req, res) => {
	res.json(mentorSessions);
});

app.get('/api/mentor/progress', (req, res) => {
	res.json(mentorProgress);
});

app.listen(PORT, () => {
	console.log(`EduBridge backend running on port ${PORT}`);
});
