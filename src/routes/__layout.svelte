<script lang="ts">
	import '../app.css';
</script>

<div class="wrapper">
	<slot />
</div>

<style>
	:global(:root) {
		--color-bg: theme('colors.white');
		--color-bg-contrast: theme('colors.black');
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--color-bg: theme('colors.black');
			--color-bg-contrast: theme('colors.white');
		}
	}

	:global(body) {
		background-color: var(--color-bg);
		color: var(--color-bg-contrast);
		@apply font-mono;
	}
</style>
