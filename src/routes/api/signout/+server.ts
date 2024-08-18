import { invalidate } from '$app/navigation';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals }) {
	locals.session = null;

	return json({
		status: 200
	});
}
