<script lang="ts">
	import { DateTime } from 'luxon';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Table from '$lib/components/table.svelte';
	import Link from '$lib/components/link.svelte';
	import { onMount } from 'svelte';
	import type { Item, ItemSummary, Sort } from '$services/types';

	/** @type {import('./$types').PageData} */
	export const data: Item[] | number = null;

	let err = '';

	$: sort = {
		page: parse($page.url.searchParams.get('page'), 0),
		perPage: parse($page.url.searchParams.get('perPage'), 10),
		direction: $page.url.searchParams.get('direction') ?? '',
		sortBy: $page.url.searchParams.get('sortBy') ?? '',
		tag: $page.url.searchParams.get('tag') ?? ''
	};

	const columns: any = [
		{ label: 'Name', field: 'name', sortable: true },
		{ label: 'Price', field: 'price', sortable: true },
		{
			field: 'endingAt',
			label: 'Time Left',
			formatter: (item: ItemSummary) => timeLeft(item.endingAt),
			sortable: true
		},
		{ label: '# Bids', field: 'bids', sortable: true },
		{ label: '# Views', field: 'views', sortable: true },
		{ label: '# Likes', field: 'likes', sortable: true },
		{
			label: 'Link',
			component: Link,
			props: (item: ItemSummary) => {
				return { href: `/items/${item.id}`, child: 'View' };
			}
		}
	];

	onMount(() => {
		invalidateAll();
	});

	const parse = (val: string, def: number) => {
		const parsed = parseInt(val);
		if (isNaN(parsed)) {
			return def;
		} else {
			return parsed;
		}
	};

	function timeLeft(t: number) {
		let _t = typeof t === 'object' ? (t as any).toMillis() : t;
		const endingAt = DateTime.fromMillis(_t);

		if (endingAt < DateTime.now()) {
			return '-';
		} else {
			return endingAt.toRelative()?.replace('in ', '');
		}
	}

	function updateParams(update: Partial<Sort>) {
		if (!browser) {
			return;
		}

		const params = new URLSearchParams({ ...sort, ...update } as any);

		goto(`/dashboard/items?${params.toString()}`, {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	}

	function onChange(e: any) {
		updateParams(e.detail);
	}

	function onSelectChange(e: any) {
		updateParams({ tag: e.target.value });
	}
</script>

<div class="flex justify-between">
	<div class="text-3xl mb-4">Your Items</div>
</div>

{#if err}
	<div class="text-red-500 text-lg font-bold">{err}</div>
{/if}

<Table on:change={onChange} {sort} {columns} />
