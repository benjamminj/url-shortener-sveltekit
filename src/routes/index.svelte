<script lang="ts">
	import { browser } from '$app/env';
	import { enhance } from '$lib/form';
	import Input from '$lib/input.svelte';
	import { getMappingSchemaHtmlAttributes, Mapping } from './_mappings';

	// TODO: types??
	export let data: any;
	export let form: any = undefined;

	$: console.log(form, data);
	// TODO: preprocess this instead of generating at runtime??
	const validations = getMappingSchemaHtmlAttributes();
</script>

<main class="max-w-lg mx-auto flex flex-col align-center mb-20">
	<h1 class="text-center font-extrabold text-5xl my-20 mb-20">url mappings</h1>

	<ul class="space-y-2">
		{#each data?.mappings as mapping}
			{@const readonly = form?.editable !== mapping?.slug ? true : null}
			<li>
				<form
					class="flex"
					method="post"
					use:enhance={{
						pending: () => {
							if (readonly) {
								form = { editable: mapping.slug };
							}
						},
						result: async ({ response }) => {
							const json = await response?.json();
							console.log('>>', json.form);
							form = json.form;
						}
					}}
				>
					<input name="id" hidden readonly value={mapping.id} />
					<Input name="slug" label="slug" value={mapping.slug} {readonly} {...validations.slug} />
					<Input name="url" label="url" value={mapping.url} {readonly} {...validations.url} />
					{#if readonly}
						<button
							name="intent"
							value="edit"
							class="bg-sky-200 text-black leading-none uppercase h-16 px-4 dark:border-none border-2 border-black"
						>
							edit
						</button>
					{:else}
						<button
							name="intent"
							value="update"
							class="bg-emerald-200 text-black leading-none uppercase h-16 px-4 dark:border-none border-2 border-black"
						>
							save
						</button>
					{/if}
				</form>
			</li>
		{/each}
	</ul>

	<h2 class="my-20 mb-10 text-3xl text-center font-bold">Add a new mapping</h2>
	<form
		method="post"
		use:enhance={{
			error: async ({ response }) => {
				const json = await response?.json();

				form = { errors: json.form.errors };
			},
			result: ({ form }) => form.reset()
		}}
	>
		<div class="w-full flex">
			<Input
				name="slug"
				label="slug"
				value={form?.slug}
				{...validations.slug}
				error={form?.errors?.slug?._errors[0]}
			/>
			<!-- 
				NOTE: the error handling INCORRECTLY maps to the wrong input...might need to
				add some extra logic to make sure the right errors get to the right forms if
				there's multiples on the page.
			-->
			<Input
				name="url"
				label="url"
				{...validations.url}
				value={form?.url}
				error={form?.errors?.url?._errors[0]}
			/>

			<button
				name="intent"
				value="add"
				class="text-black bg-emerald-200 p-4 leading-none uppercase h-16 dark:border-none border-2 border-black"
			>
				save
			</button>
		</div>
	</form>
</main>
