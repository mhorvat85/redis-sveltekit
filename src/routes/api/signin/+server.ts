import { signin } from '$services/auth/auth';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { username, password } = await request.json();

	const userId = await signin(username, password);

	locals.session.userId = userId;
	locals.session.username = username;

	return json({ status: 200 });
}
