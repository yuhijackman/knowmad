"use server";

import { validatedAction } from "@/lib/actions/validatedAction";
import { createClient } from "@/utils/supabase/server";
import { loginSchema, signUpSchema } from "@/zod-schemas/authentication";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginAction = validatedAction(loginSchema, async (formData) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	});

	if (error) {
		throw new Error(
			error.message || "Invalid credentials or login failed. Please try again.",
		);
	}

	revalidatePath("/", "layout");
	redirect("/dashboard");
});

export const signUpAction = validatedAction(signUpSchema, async (formData) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({
		email: formData.email,
		password: formData.password,
	});

	if (error) {
		throw new Error(error.message || "Sign up failed. Please try again.");
	}

	revalidatePath("/", "layout");
	redirect("/dashboard");
});
