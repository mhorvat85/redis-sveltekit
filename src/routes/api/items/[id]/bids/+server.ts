import { json, error } from '@sveltejs/kit';
import type { Item } from '$services/types';
import { DateTime } from 'luxon';
import { createBid } from '$services/queries/bids';
import { getItem } from '$services/queries/items/items';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params, locals }) {
	if (!locals.session.userId) {
		error(401, 'You must login to do that');
	}

	const item = (await getItem(params.id)) as any as Item;

	if (!item) {
		error(404, 'Item not found');
	}

	const body = await request.json();

	await createBid({
		itemId: params.id,
		userId: locals.session.userId,
		amount: body.amount,
		createdAt: DateTime.now(),
		itemEndingAt: item.endingAt
	});

	return json({
		status: 201
	});
}
