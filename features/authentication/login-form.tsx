"use client";

import {
	Alert,
	Button,
	Group,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useActionState, useMemo } from "react";
import { FORGOT_PASSWORD_PATH, SIGN_UP_PATH } from "@/constants/routes";
import { loginAction } from "@/lib/actions/authentication";
import type { LoginInput } from "@/zod-schemas/authentication";

type LoginInputKeys = keyof LoginInput;

export function LoginForm() {
	const icon = <IconInfoCircle />;
	const [state, formAction, pending] = useActionState(loginAction, undefined);
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

	const error =
		state?.success === false && state?.message !== "" ? state.message : null;

	return (
		<>
			<form action={formAction}>
				<Stack>
					{error && (
						<Alert variant="light" color="red" title="Login Failed" icon={icon}>
							{error}
						</Alert>
					)}
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

					<Group justify="space-between">
						<Text size="sm" ta="center">
							<Link href={FORGOT_PASSWORD_PATH}>Forgot password?</Link>
						</Text>
					</Group>
				</Stack>

				<Group justify="space-between">
					<Text c="dimmed" size="sm" ta="center" mt="md">
						Don't have an account? <Link href={SIGN_UP_PATH}>Register</Link>
					</Text>
					<Button fullWidth={true} radius="xl" type="submit" loading={pending}>
						Sign in
					</Button>
				</Group>
			</form>
		</>
	);
}
