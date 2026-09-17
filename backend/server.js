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
		id: 'SES-1001',
		studentId: 'STU-1001',
		studentName: 'Aarav Sharma',
		mentorId: 'MTR-1001',
		mentorName: 'Priya Mehta',
		date: '2026-09-20',
		time: '10:00 AM',
		topic: 'Mathematics Fundamentals',
		status: 'Scheduled',
	},
	{
		id: 'SES-1002',
		studentId: 'STU-1002',
		studentName: 'Diya Patel',
		mentorId: 'MTR-1001',
		mentorName: 'Priya Mehta',
		date: '2026-09-12',
		time: '4:00 PM',
		topic: 'Science Revision',
		status: 'Completed',
	},
];

let nextSessionId = 1003;

const messages = [
	{
		id: 'MSG-1001',
		senderId: 'STU-1001',
		senderName: 'Aarav Sharma',
		receiverId: 'MTR-1001',
		receiverName: 'Priya Mehta',
		message: 'Could we review quadratic equations in our next session?',
		timestamp: '2026-09-15T10:00:00.000Z',
	},
	{
		id: 'MSG-1002',
		senderId: 'MTR-1001',
		senderName: 'Priya Mehta',
		receiverId: 'STU-1001',
		receiverName: 'Aarav Sharma',
		message: 'Absolutely. Please bring your practice questions.',
		timestamp: '2026-09-15T10:15:00.000Z',
	},
];

let nextMessageId = 1003;

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
		mentorId: 'MTR-1001',
		name: 'Aarav Sharma',
		email: 'aarav.sharma@example.com',
		grade: 10,
		attendance: 92,
		overallProgress: 78,
		status: 'On track',
	},
	{
		id: 2,
		mentorId: 'MTR-1001',
		name: 'Diya Patel',
		email: 'diya.patel@example.com',
		grade: 9,
		attendance: 88,
		overallProgress: 85,
		status: 'On track',
	},
];

let nextStudentId = 3;

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
	const { studentId } = req.query;
	const filteredSessions = studentId
		? sessions.filter((session) => session.studentId === studentId)
		: sessions;

	res.json(filteredSessions);
});

app.post('/api/sessions/book', (req, res) => {
	const {
		studentId,
		studentName,
		mentorId,
		mentorName,
		date,
		time,
		topic,
	} = req.body;

	if (!studentId || !studentName || !mentorId || !mentorName || !date || !time || !topic) {
		return res.status(400).json({ message: 'All session fields are required.' });
	}

	const session = {
		id: `SES-${nextSessionId++}`,
		studentId,
		studentName,
		mentorId,
		mentorName,
		date,
		time,
		topic,
		status: 'Pending',
	};

	sessions.push(session);
	return res.status(201).json({ message: 'Session booked successfully', session });
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
	const { mentorId } = req.query;
	const filteredStudents = mentorId
		? mentorStudents.filter((item) => item.mentorId === mentorId)
		: mentorStudents;

	res.json(filteredStudents);
});

app.post('/api/mentor/students', (req, res) => {
	const { mentorId, studentName, studentEmail, grade } = req.body;

	if (!mentorId || !studentName || !studentEmail || !grade) {
		return res.status(400).json({ message: 'Mentor, student name, email, and grade are required.' });
	}

	const newStudent = {
		id: `STU-${String(nextStudentId++).padStart(4, '0')}`,
		mentorId,
		name: studentName,
		email: studentEmail,
		grade,
		attendance: 0,
		overallProgress: 0,
		status: 'New',
	};

	mentorStudents.push(newStudent);
	return res.status(201).json(newStudent);
});

app.get('/api/mentor/sessions', (req, res) => {
	const { mentorId } = req.query;
	const filteredSessions = mentorId
		? sessions.filter((session) => session.mentorId === mentorId)
		: sessions;

	res.json(filteredSessions);
});

app.post('/api/mentor/sessions/schedule', (req, res) => {
	const {
		studentId,
		studentName,
		mentorId,
		mentorName,
		date,
		time,
		topic,
	} = req.body;

	if (!studentId || !studentName || !mentorId || !mentorName || !date || !time || !topic) {
		return res.status(400).json({ message: 'All session fields are required.' });
	}

	const session = {
		id: `SES-${nextSessionId++}`,
		studentId,
		studentName,
		mentorId,
		mentorName,
		date,
		time,
		topic,
		status: 'Scheduled',
	};

	sessions.push(session);
	return res.status(201).json({ message: 'Session scheduled successfully', session });
});

app.patch('/api/mentor/sessions/:id/status', (req, res) => {
	const allowedStatuses = ['Pending', 'Scheduled', 'Completed', 'Cancelled'];
	const { status } = req.body;
	const session = sessions.find((item) => item.id === req.params.id);

	if (!session) {
		return res.status(404).json({ message: 'Session not found.' });
	}

	if (!allowedStatuses.includes(status)) {
		return res.status(400).json({
			message: `Status must be one of: ${allowedStatuses.join(', ')}.`,
		});
	}

	session.status = status;
	return res.json({ message: 'Session status updated successfully', session });
});

app.get('/api/mentor/progress', (req, res) => {
	res.json(mentorProgress);
});

app.post('/api/messages', (req, res) => {
	const {
		senderId,
		senderName,
		receiverId,
		receiverName,
		message,
	} = req.body;

	if (!senderId || !senderName || !receiverId || !receiverName || !message) {
		return res.status(400).json({ message: 'All message fields are required.' });
	}

	const newMessage = {
		id: `MSG-${nextMessageId++}`,
		senderId,
		senderName,
		receiverId,
		receiverName,
		message,
		timestamp: new Date().toISOString(),
	};

	messages.push(newMessage);
	return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
});

app.get('/api/messages', (req, res) => {
	const { userId } = req.query;
	const filteredMessages = userId
		? messages.filter((item) => item.senderId === userId || item.receiverId === userId)
		: messages;

	const sortedMessages = [...filteredMessages].sort(
		(first, second) => new Date(first.timestamp) - new Date(second.timestamp),
	);

	res.json(sortedMessages);
});

app.listen(PORT, () => {
	console.log(`EduBridge backend running on port ${PORT}`);
});
