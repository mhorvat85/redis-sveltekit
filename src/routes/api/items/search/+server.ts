import { json } from '@sveltejs/kit';
import { searchItems } from '$services/queries/items';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const term = url.searchParams.get('term');

	const items = ((await searchItems(term, 5)) || []).map((item) => {
		item.id = item.id.replace('items#', '');
		return item;
	});

	return json({
		body: { results: items }
	});
}
