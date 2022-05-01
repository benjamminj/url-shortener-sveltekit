/// <reference types="@sveltejs/kit" />
/// <reference types="@cloudflare/workers-types" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}

	interface Platform {
		env: {
			KV_MAPPINGS: KVNamespace;
		};
		context: {
			waitUntil(promise: Promise<any>): void;
		};
	}

	// interface Session {}
	// interface Stuff {}
}
