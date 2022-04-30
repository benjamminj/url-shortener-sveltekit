<script lang="ts">
	import clsx from 'clsx';
	export let label: string;
	// TODO: may need to be a "component" or a "slot"
	export let error: string | undefined = undefined;
</script>

<div>
	<label class="relative flex w-full h-16">
		<input
			class={clsx(
				'peer w-full rounded-none border-2 p-2 pt-6 focus:outline-none border-slate-700 focus:border-black dark:border-white dark:bg-transparent focus:dark:border-white',
				error && 'border-red-700 bg-red-100 dark:border-red-700',
				'read-only:border-slate-600 read-only:focus:border-slate-600'
			)}
			placeholder=" "
			{...$$props}
		/>
		<span class="absolute left-2 top-2 ml-[1px] text-xs uppercase">
			{label}
		</span>
	</label>

	{#if error}
		<div class="bg-red-100 py-1 px-2 border-2 border-t-0 border-red-700 dark:text-black">
			{error}
		</div>
	{/if}
</div>

<style>
</style>
