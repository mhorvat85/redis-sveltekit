<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data: any;

	let { username, sharedItems, likedItems } = data;
</script>

<h1 class="text-3xl">{username}'s profile</h1>

{#if sharedItems.length}
	<hr class="my-4" />

	<h3 class="text-xl">Items you <span class="font-bold">both</span> like</h3>
	<div class="flex flex-wrap gap-4 justify-start">
		{#each sharedItems as item}
			<Card {item} />
		{/each}
	</div>
{/if}

<hr class="my-12" />

<h3 class="text-xl">
	Items {$page.data.user.username === username ? 'you like' : username + ' likes'}
</h3>
<div class="flex flex-wrap gap-4 justify-start">
	{#each likedItems as item}
		<Card {item} />
	{/each}
</div>
