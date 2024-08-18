import { getUserById } from '$services/queries/users';
import { commonLikedItems, likedItems } from '$services/queries/likes';
import { serialize } from '$services/queries/items/serialize.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { id } = params;

	const user = await getUserById(id);
	const sharedItems = await commonLikedItems(id, locals.session.userId);
	const liked = await likedItems(id);

	return {
		username: user.username,
		sharedItems: (sharedItems || []).map((item) => serialize(item)),
		likedItems: (liked || []).map((item) => serialize(item))
	};
}
