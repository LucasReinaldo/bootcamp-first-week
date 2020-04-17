import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';

function App() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get('/home').then((response) => {
			setProjects(response.data);
		});
	}, []);

	const handleAddProject = async () => {
		const response = await api.post('/home', {
			title: `ABCS ${Date.now()}`,
			owner: 'Lucas Melo',
		});

		setProjects([...projects, response.data]);
	};

	return (
		<>
			<h1>Hello there!</h1>
			<ul>
				{projects.map((project) => (
					<li key={project.id}>{project.title}</li>
				))}
			</ul>
			<button type="button" onClick={handleAddProject}>
				Add Project!
			</button>
		</>
	);
}

export default App;
