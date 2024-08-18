<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/fetch';

	let name = 'Chair';
	let duration = 60;
	let desc = 'This is a fantastic chair that you would be quite happy with!';
	let data = null;
	let err: any = null;

	async function onSubmit() {
		let apiData;
		try {
			const apiUrl: any = `https://pixabay.com/api/?key=${process.env.API}&q=${name}&image_type=photo`;
			const res = await fetch(apiUrl);
			if (res.ok) {
				apiData = await res.json();
			}
		} catch (err) {
			console.log(err);
		} finally {
			[data, err] = await post('/api/items/new', {
				name,
				description: desc,
				duration,
				imageUrl:
					apiData && apiData.hits
						? apiData.hits[Math.floor(Math.random() * apiData.hits.length)].webformatURL
						: null
			});
		}

		if (!err) {
			goto(`/items/${data.body.id}`);
		}
	}
</script>

<div class="w-1/2 mx-auto">
	<form method="POST" on:submit|preventDefault={onSubmit}>
		<div class="flex flex-col mb-2">
			<label for="name" class="font-bold">Item Name</label>
			<input
				bind:value={name}
				id="name"
				required
				minlength="3"
				maxlength="60"
				type="text"
				class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
				name="username"
				placeholder="Item Name"
			/>
		</div>

		<div class="mb-2">
			<label for="desc" class="font-bold">Description</label>
			<textarea
				bind:value={desc}
				id="desc"
				required
				minlength="3"
				maxlength="600"
				class="rounded-lg border-transparent flex-1 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
				name="description"
				placeholder="Item Description"
			/>
		</div>

		<div class="flex flex-col mb-2">
			<label for="dur" class="font-bold">Duration</label>
			<select
				bind:value={duration}
				id="dur"
				name="duration"
				class="border py-2 px-5 shadow-sm border-gray-300 rounded"
			>
				<option value={60}>One Minute</option>
				<option value={60 * 10}>Ten Minutes</option>
				<option value={60 * 60 * 24}>One Day</option>
				<option value={60 * 60 * 24 * 7}>One Week</option>
			</select>
		</div>

		{#if err}
			{err}
		{/if}

		<button
			class="py-2 px-4 w-1/3 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
		>
			Submit
		</button>
	</form>
</div>
