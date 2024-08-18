import { json } from '@sveltejs/kit';
import { DateTime } from 'luxon';
import { createItem } from '$services/queries/items/items';
import { createImageUrl } from '$services/utils/image-url';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const data = await request.json();

	const id = await createItem({
		name: data.name,
		description: data.description,
		createdAt: DateTime.now(),
		endingAt: DateTime.now().plus({ seconds: data.duration }),
		imageUrl: data.imageUrl || createImageUrl(),
		ownerId: locals.session.userId,
		highestBidUserId: '',
		price: 0,
		views: 0,
		likes: 0,
		bids: 0,
		status: ''
	});

	return json({
		status: 200,
		body: {
			id
		}
	});
}
