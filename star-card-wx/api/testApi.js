import {
	shops
} from '../mock/data.js';

export function fetchMerchants(page = 1, limit = 10) {
	return new Promise((resolve) => {
		setTimeout(() => {
			const start = (page - 1) * limit;
			const end = start + limit;
			resolve({
				data: shops.slice(start, end),
				total: shops.length
			});
		}, 500);
	});
}