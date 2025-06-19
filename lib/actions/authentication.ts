"use server";

import { validatedAction } from "@/lib/actions/validatedAction";
import { createClient } from "@/utils/supabase/server";
import { loginSchema } from "@/zod-schemas/authentication";

export const authenticate = validatedAction(loginSchema, async (data) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password,
	});

	if (error) {
		throw new Error(
			error.message || "Invalid credentials or login failed. Please try again.",
		);
	}

	return { message: "Login successful!" };
});
