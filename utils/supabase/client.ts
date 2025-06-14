import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (supabaseUrl === undefined) {
		throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
	}
	if (supabaseAnonKey === undefined) {
		throw new Error(
			"Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable",
		);
	}

	return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
