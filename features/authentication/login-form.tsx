"use client";

import { authenticate } from "@/lib/actions/authentication";
import type { LoginInput } from "@/zod-schemas/authentication";
import {
	Anchor,
	Button,
	Checkbox,
	Group,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useActionState, useMemo } from "react";

type LoginInputKeys = keyof LoginInput;

export function LoginForm() {
	const [state, formAction, pending] = useActionState(authenticate, undefined);
	const initialEmail = state?.submittedData?.email || "";
	// Security Note: Passwords should generally NOT be re-populated into input fields
	// even on validation failure. This is a common security practice to prevent
	// accidental exposure or caching of sensitive credentials.
	const initialPassword = "";

	const fieldErrors = useMemo(() => {
		const errorsMap: Record<LoginInputKeys, string> = {
			email: "",
			password: "",
		};
		if (state?.success === false && state.errors) {
			for (const err of state.errors) {
				const fieldName = err.path[0];
				if (
					typeof fieldName === "string" &&
					(fieldName === "email" || fieldName === "password")
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

					<Group justify="space-between" mb="lg">
						<Checkbox label="Remember me" name="remember" disabled={pending} />
						<Anchor component="button" size="sm" type="button">
							Forgot password?
						</Anchor>
					</Group>
				</Stack>
				<Group justify="space-between" mt="xl">
					<Text c="dimmed" size="sm" ta="center" mt="md">
						Don't have an account? <Link href="/register">Register</Link>
					</Text>
					<Button fullWidth={true} radius="xl" type="submit" loading={pending}>
						Sign in
					</Button>
				</Group>
			</form>
		</>
	);
}
