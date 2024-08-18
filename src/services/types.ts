import type { DateTime } from 'luxon';
import type { SvelteComponent } from 'svelte';

export interface Session {
	id: string;
	userId: string | null;
	username: string;
}

export interface CreateSessionDto {
	userId: string;
}

export interface CreateUserAttrs {
	username: string;
	password: string;
}

export interface User {
	id: string;
	username: string;
	password: string;
}

export interface CreateItemAttrs {
	name: string;
	imageUrl: string;
	description: string;
	createdAt: DateTime;
	endingAt: DateTime;
	ownerId: string;
	highestBidUserId: string;
	status: string;
	price: number;
	views: number;
	likes: number;
	bids: number;
}

export interface Item {
	id: string;
	name: string;
	ownerId: string;
	imageUrl: string;
	description: string;
	createdAt: DateTime;
	endingAt: DateTime;
	views: number;
	likes: number;
	price: number;
	bids: number;
	highestBidUserId: string;
}

export interface CreateBidAttrs {
	itemId: string;
	userId: string;
	amount: number;
	createdAt: DateTime;
	itemEndingAt: DateTime;
}

export interface Bid {
	createdAt: DateTime;
	amount: number;
}

export interface ItemSummary {
	id: string;
	name: string;
	endingAt: number;
	imageUrl: string;
	price: number;
	bids: number;
	views: number;
	likes: number;
}

export interface ColumnConfig {
	id?: string;
	formatter?: (val: ItemSummary) => string | number;
	component?: typeof SvelteComponent;
	field?: 'name' | 'price' | 'endingAt' | 'bids' | 'views' | 'likes';
	label: string;
	sortable?: boolean;
	props?: (val: ItemSummary) => {
		href: string;
		child: string;
	};
}

export interface Sort {
	page: number;
	perPage: number;
	sortBy: string;
	direction: string;
	tag?: string;
}
