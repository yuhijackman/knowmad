"use client";

import { LOGIN_PATH } from "@/constants/routes";
import { signUpAction } from "@/lib/actions/authentication";
import type { SignUpInput } from "@/zod-schemas/authentication";
import {
	Button,
	Group,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useActionState, useMemo } from "react";

type SignUpInputKeys = keyof SignUpInput;

export function SignUpForm() {
	const [state, formAction, pending] = useActionState(signUpAction, undefined);
	const initialEmail = state?.submittedData?.email || "";
	// Security Note: Passwords should generally NOT be re-populated into input fields
	// even on validation failure. This is a common security practice to prevent
	// accidental exposure or caching of sensitive credentials.
	const initialPassword = "";
	const initialRepeatPassword = "";

	const fieldErrors = useMemo(() => {
		const errorsMap: Record<SignUpInputKeys, string> = {
			email: "",
			password: "",
			repeatPassword: "",
		};
		if (state?.success === false && state.errors) {
			for (const err of state.errors) {
				const fieldName = err.path[0];
				if (
					typeof fieldName === "string" &&
					(fieldName === "email" ||
						fieldName === "password" ||
						fieldName === "repeatPassword")
				) {
					errorsMap[fieldName] = err.message;
				}
			}
		}
		return errorsMap;
	}, [state?.errors, state?.success]);

	return (
		<>
			<form action={formAction}>
				<Stack>
					<TextInput
						label="Email"
						name="email"
						placeholder="your@email.com"
						required={true}
						radius="md"
						disabled={pending}
						error={fieldErrors.email}
						defaultValue={initialEmail}
					/>

					<PasswordInput
						label="Password"
						name="password"
						placeholder="Your password"
						required={true}
						radius="md"
						disabled={pending}
						error={fieldErrors.password}
						defaultValue={initialPassword}
					/>

					<PasswordInput
						label="RepeatPassword"
						name="repeatPassword"
						placeholder="Repeat Your password"
						required={true}
						radius="md"
						disabled={pending}
						error={fieldErrors.repeatPassword}
						defaultValue={initialRepeatPassword}
					/>
				</Stack>

				<Group justify="space-between" mt="xl">
					<Text c="dimmed" size="sm" ta="center" mt="md">
						Already have an account? <Link href={LOGIN_PATH}>Login</Link>
					</Text>
					<Button fullWidth={true} radius="xl" type="submit" loading={pending}>
						Sign up
					</Button>
				</Group>
			</form>
		</>
	);
}
