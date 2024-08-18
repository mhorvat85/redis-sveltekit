import { itemsByUser } from '$services/queries/items';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
	const sort = {
		page: parse(url.searchParams.get('page'), 0),
		perPage: parse(url.searchParams.get('perPage'), 10),
		sortBy: url.searchParams.get('sortBy') ?? '',
		direction: url.searchParams.get('direction') ?? '',
		tag: (url.searchParams.get('tag') ?? '').replace(/[^a-zA-Z0-9 -]/gi, '')
	};

	const { items, totalPages } = await itemsByUser(locals.session.userId, sort);

	const serializedItems = items.map((i) => JSON.stringify(i));

	return {
		serializedItems,
		totalPages
	};
}

const parse = (val: string, def: number) => {
	const parsed = parseInt(val);
	if (isNaN(parsed)) {
		return def;
	} else {
		return parsed;
	}
};
