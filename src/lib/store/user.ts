import { writable } from 'svelte/store';

const USER = writable({
	fname: 'Didier',
	lname: 'Munezero',
	year: '2021',
	type: 'ADMIN',
	photo: 'https://avatars.githubusercontent.com/u/53856673?v=4'
});

const updateUser = (user) => {
	USER.set(user);
};

export default {
	USER,
	updateUser
};
