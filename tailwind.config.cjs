/** @type {import('tailwindcss').Config}*/
const config = {
	// 1. Apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
	],
	theme: {
		extend: {}
	},
	plugins: [

	]
};

module.exports = config;
