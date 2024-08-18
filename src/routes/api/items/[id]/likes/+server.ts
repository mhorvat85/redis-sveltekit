import { json } from '@sveltejs/kit';
import { getItem } from '$services/queries/items/items';
import { likeItem, unlikeItem } from '$services/queries/likes';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, locals }) {
	if (!locals.session.userId) {
		return json({
			status: 401,
			body: { message: 'You must login to do that' }
		});
	}

	await likeItem(params.id, locals.session.userId);
	const item = await getItem(params.id);

	return json({
		status: 201,
		body: {
			item: {
				...item,
				endingAt: item?.endingAt.toMillis(),
				createdAt: item?.createdAt.toMillis()
			}
		}
	});
}

export async function DELETE({ params, locals }) {
	if (!locals.session.userId) {
		return json({
			status: 401,
			body: { message: 'You must login to do that' }
		});
	}

	await unlikeItem(params.id, locals.session.userId);
	const item = await getItem(params.id);

	return json({
		status: 201,
		body: {
			item: {
				...item,
				endingAt: item?.endingAt.toMillis(),
				createdAt: item?.createdAt.toMillis()
			}
		}
	});
}
