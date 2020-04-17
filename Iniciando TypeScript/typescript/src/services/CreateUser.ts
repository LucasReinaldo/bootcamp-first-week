interface TechObject {
	title: string;
	experience: number;
}

interface CreateUserData {
	name?: string; //não é obrigatório, se não for declarado é undefined
	email: string;
	password: string;
	techs: Array<string | TechObject>; //se for só array string[]
}

export default function createUser({
	name,
	email,
	password,
	techs,
}: CreateUserData) {
	const user = {
		name,
		email,
		password,
		techs,
	};

	return user;
}
