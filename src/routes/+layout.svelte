<script>
	import '../app.postcss';
	import { BottomNav, BottomNavItem, Tooltip, DarkMode } from 'flowbite-svelte';
	import {
		QuestionCircleOutline,
		AdjustmentsVerticalOutline,
		LayersOutline
	} from 'flowbite-svelte-icons';
</script>

<slot />
<DarkMode btnClass="absolute"></DarkMode>

<BottomNav position="absolute" navType="application" classInner="grid-cols-3">
	<BottomNavItem btnName="Wallet" appBtnPosition="middle">
		<QuestionCircleOutline
			class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
		/>
		<Tooltip arrow={false}>Help</Tooltip>
	</BottomNavItem>
	<div class="flex items-center justify-center">
		<BottomNavItem
			btnName="Create new item"
			appBtnPosition="middle"
			btnClass="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary-600 rounded-full hover:bg-primary-700 group focus:ring-4 focus:ring-primary-300 focus:outline-none dark:focus:ring-primary-800"
		>
			<LayersOutline
				class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
			/>
			<Tooltip arrow={false}>Help</Tooltip>
		</BottomNavItem>
	</div>
	<BottomNavItem btnName="Settings" appBtnPosition="middle">
		<AdjustmentsVerticalOutline
			class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
		/>

		<Tooltip arrow={false}>Settings</Tooltip>
	</BottomNavItem>
</BottomNav>
