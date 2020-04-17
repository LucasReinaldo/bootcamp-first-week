import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
	const user = createUser({
		email: 'lucasmelo@gmail.com',
		password: '123',
		techs: ['Node', { title: 'JS', experience: 100 }],
	});

	return response.json(user);
}
