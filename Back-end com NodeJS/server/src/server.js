const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors());

app.use(express.json()); //para que o express entenda req json.

let projects = [];

function logRequest(request, response, next) {
	const { method, url } = request;

	const logLabel = `[${method.toUpperCase()}] ${url}`;

	console.log(logLabel);

	next();
}

function validateProjectId(request, response, next) {
	const { id } = request.params;
	if (!isUuid(id)) {
		return response.status(400).json({ error: 'Invalid project ID.' });
	}
	return next();
}

app.use(logRequest);
app.use('/home/:id', validateProjectId);

app.get('/home', (request, response) => {
	const { title } = request.query;

	const results = title
		? projects.filter((project) => project.title.includes(title))
		: projects;

	return response.json(results);
});

app.put('/home/:id', (request, response) => {
	const { id } = request.params;
	const { title, owner } = request.body;

	const projectIndex = projects.findIndex((project) => project.id === id);

	if (projectIndex < 0) {
		return response.status(400).json({ error: 'Not found' });
	}

	const project = {
		id,
		title,
		owner,
	};

	projects[projectIndex] = project;

	return response.json(project);
});

app.delete('/home/:id', (request, response) => {
	const { id } = request.params;

	const projectIndex = projects.findIndex((project) => project.id === id);

	if (projectIndex < 0) {
		return response.status(400).json({ error: 'Not found' });
	}

	projects.splice(projectIndex, 1);

	return response.status(204).send();
});

app.post('/home', (request, response) => {
	const { title, owner } = request.body;

	const project = { id: uuid(), title, owner };

	projects.push(project);

	return response.json(project);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on port: ${port} 💻`);
});
