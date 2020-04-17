import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	FlatList,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
} from 'react-native';

import api from './services/api';

const App = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get('/home').then((res) => setProjects(res.data));
	}, []);

	async function handleAddProject() {
		const res = await api.post('/home', {
			title: `Lucas ${Date.now()}`,
			owner: 'Lucas',
		});

		setProjects([...projects, res.data]);
	}

	// data={projects} -> precisa ser um array
	// keyExtractor={project => project.id} -> vai sempre chamar uma função
	// renderItem={({item : project})} -> renomeando os itens da lista (cada item) para project
	return (
		<>
			<StatusBar barStyle={'light-content'} />
			<SafeAreaView style={styles.container}>
				<FlatList
					data={projects}
					keyExtractor={(project) => project.id}
					renderItem={({ item: project }) => (
						<Text style={styles.project}>{project.title}</Text>
					)}
				/>
				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={handleAddProject}>
					<Text style={styles.textButton}>Add Project</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E64398',
	},

	project: {
		color: '#F0EBF4',
		fontSize: 18,
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: '#F0EBF4',
		margin: 20,
		height: 50,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},

	textButton: {
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default App;
