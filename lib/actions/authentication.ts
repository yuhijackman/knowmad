"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
	DASHBOARD_PATH,
	PASSWORD_RESET_PATH,
	SIGN_UP_SUCCESS_PATH,
} from "@/constants/routes";
import { validatedAction } from "@/lib/actions/validatedAction";
import { createClient } from "@/utils/supabase/server";
import {
	forgotPasswordSchema,
	loginSchema,
	signUpSchema,
	updatePasswordSchema,
} from "@/zod-schemas/authentication";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const loginAction = validatedAction(loginSchema, async (formData) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	});

	if (error) {
		throw new Error("Incorrect email address or password.");
	}

	revalidatePath("/", "layout");
	redirect(DASHBOARD_PATH);
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
	redirect(SIGN_UP_SUCCESS_PATH);
});

export const forgotPasswordAction = validatedAction(
	forgotPasswordSchema,
	async (formData) => {
		const supabase = await createClient();

		const { error } = await supabase.auth.resetPasswordForEmail(
			formData.email,
			{
				redirectTo: `${BASE_URL}${PASSWORD_RESET_PATH}`,
			},
		);
		if (error) {
			throw new Error(error.message || "Oops, something wasn't right.");
		}

		return {
			message: `We have sent password recovery instructions to ${formData.email}.`,
		};
	},
);

export const updatePasswordAction = validatedAction(
	updatePasswordSchema,
	async (formData) => {
		const supabase = await createClient();

		const { error } = await supabase.auth.updateUser({
			password: formData.password,
		});

		if (error) {
			throw new Error(error.message || "Oops, something wasn't right.");
		}

		revalidatePath("/", "layout");
		redirect(DASHBOARD_PATH);
	},
);
