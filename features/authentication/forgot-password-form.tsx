"use client";

import { LOGIN_PATH } from "@/constants/routes";
import { forgotPasswordAction } from "@/lib/actions/authentication";
import type { ForgotPasswordInput } from "@/zod-schemas/authentication";
import { Alert, Button, Group, Paper, Text, TextInput } from "@mantine/core";
import { IconArrowLeft, IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useActionState, useMemo } from "react";
import classes from "./forgot-password-form.module.css";

type ForgotPasswordInputKeys = keyof ForgotPasswordInput;

export function ForgotPasswordForm() {
	const icon = <IconInfoCircle />;

	const [state, formAction, pending] = useActionState(
		forgotPasswordAction,
		undefined,
	);

	const initialEmail = state?.submittedData?.email || "";
	const fieldErrors = useMemo(() => {
		const errorsMap: Record<ForgotPasswordInputKeys, string> = {
			email: "",
		};
		if (state?.success === false && state.errors) {
			for (const err of state.errors) {
				const fieldName = err.path[0];
				if (typeof fieldName === "string" && fieldName === "email") {
					errorsMap[fieldName] = err.message;
				}
			}
		}
		return errorsMap;
	}, [state?.errors, state?.success]);

	const error =
		state?.success === false && state?.message !== "" ? state.message : null;

	return (
		<Paper withBorder={true} shadow="md" p={30} radius="md" mt="xl">
			{state?.success ? (
				<>
					<Text size="lg" fw={500} ta="center" mb="md">
						Check your email!
					</Text>

					<Text size="sm" mt="sm" c="dimmed">
						{state?.data?.message}
					</Text>
				</>
			) : (
				<form action={formAction}>
					{error && (
						<Alert
							variant="light"
							color="red"
							title="Password Reset Failed"
							icon={icon}
						>
							{error}
						</Alert>
					)}
					<TextInput
						label="email"
						name="email"
						placeholder="your@email.com"
						required={true}
						radius="md"
						disabled={pending}
						error={fieldErrors.email}
						defaultValue={initialEmail}
					/>
					<Group justify="space-between" mt="lg" className={classes.controls}>
						<Text c="dimmed" size="sm" ta="center" mt="md">
							<IconArrowLeft size={12} stroke={1.5} />
							<Link href={LOGIN_PATH}>Back to the login page</Link>
						</Text>
						<Button type="submit" className={classes.control} loading={pending}>
							Reset password
						</Button>
					</Group>
				</form>
			)}
		</Paper>
	);
}
