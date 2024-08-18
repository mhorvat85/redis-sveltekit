import 'dotenv/config';
import '$services/redis/client';
import boxen from 'boxen';
import { DateTime } from 'luxon';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { useCachePage, useSession, useErrors } from '$services/middlewares';

if (!process.env.REDIS_HOST) {
	console.error(
		boxen('You must specify Redis connection info in the .env file', {
			padding: 1,
			margin: 1,
			borderStyle: 'double'
		})
	);
	process.exit(1);
}

export const handle: Handle = sequence(useErrors, useCachePage, useSession);

DateTime.prototype.toString = function () {
	return this.toMillis() as any;
};
DateTime.prototype.toJSON = function () {
	return this.toMillis() as any;
};
