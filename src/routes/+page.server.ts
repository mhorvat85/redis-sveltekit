import { itemsByPrice, itemsByViews, itemsByEndingTime } from '$services/queries/items';
import { serialize } from '$services/queries/items/serialize.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [endingSoonest, mostViews, highestPrice] = await Promise.all([
		itemsByEndingTime('ASC', 0, 10),
		itemsByViews('DESC', 0, 10),
		itemsByPrice('DESC', 0, 10)
	]);

	return {
		endingSoonest: (endingSoonest || []).map((item) => serialize(item)),
		mostViews: (mostViews || []).map((item) => serialize(item)),
		highestPrice: (highestPrice || []).map((item) => serialize(item))
	};
}
