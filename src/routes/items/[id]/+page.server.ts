import { error } from '@sveltejs/kit';
import { getItem } from '$services/queries/items';
import { incrementView } from '$services/queries/views';
import { userLikesItem } from '$services/queries/likes';
import { getBidHistory } from '$services/queries/bids';
import type { Item } from '$services/types.js';
import { serialize } from '$services/queries/items/serialize.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const item = serialize(await getItem(params.id)) as Item;

	if (!item) {
		error(404, 'Item not found');
	}

	await incrementView(item.id, locals.session.userId);
	const userLikes = await userLikesItem(item.id, locals.session.userId);
	const serializedHistory = JSON.stringify(await getBidHistory(item.id));
	const userHasHighBid = item.highestBidUserId === locals.session.userId;
	const serializedItem = JSON.stringify(item);

	return {
		serializedItem,
		userLikes,
		serializedHistory,
		userHasHighBid
	};
}
