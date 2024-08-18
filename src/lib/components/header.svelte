<script>
	import { post } from '$lib/fetch';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/button.svelte';
	import Search from '$lib/components/search.svelte';

	async function onClick() {
		await post('/api/signout');
		goto('/', {
			invalidateAll: true
		});
	}

	$: user = $page.data.user;
</script>

<div class="w-full p-2 shadow-xs bg-amber-500 mb-8">
	<div class="container mx-auto flex flex-row items-center justify-between">
		<a href="/">
			<div class="ml-8 text-lg text-white flex">RBay</div>
		</a>
		<Search />
		<div class="flex items-center mr-8 md:flex gap-4">
			{#if user && user.userId}
				<p>{user.username}</p>
				<a href="/dashboard/items/new"><Button>New</Button></a>
				<a href="/dashboard/items"><Button>Dashboard</Button></a>
				<Button role="secondary" on:click={onClick}>Logout</Button>
			{:else}
				<a href="/auth/signin"><Button>Sign In</Button></a>
				<a href="/auth/signup"><Button>Sign Up</Button></a>
			{/if}
		</div>
	</div>
</div>
