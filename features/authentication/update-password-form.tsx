"use client";
import { Alert, Button, Group, PasswordInput, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useActionState, useMemo } from "react";
import { updatePasswordAction } from "@/lib/actions/authentication";
import type { UpdatePasswordInput } from "@/zod-schemas/authentication";

type UpdatePasswordInputKeys = keyof UpdatePasswordInput;

export function UpdatePasswordForm() {
	const icon = <IconInfoCircle />;

	const [state, formAction, pending] = useActionState(
		updatePasswordAction,
		undefined,
	);

	const fieldErrors = useMemo(() => {
		const errorsMap: Record<UpdatePasswordInputKeys, string> = {
			password: "",
			repeatPassword: "",
		};
		if (state?.success === false && state.errors) {
			for (const err of state.errors) {
				const fieldName = err.path[0];
				if (
					typeof fieldName === "string" &&
					(fieldName === "password" || fieldName === "repeatPassword")
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
						<Alert
							variant="light"
							color="red"
							title="Password Reset Failed"
							icon={icon}
						>
							{error}
						</Alert>
					)}

					<PasswordInput
						label="Password"
						name="password"
						placeholder="Your password"
						required={true}
						radius="md"
						disabled={pending}
						error={fieldErrors.password}
					/>

					<PasswordInput
						label="RepeatPassword"
						name="repeatPassword"
						placeholder="Repeat Your password"
						required={true}
						radius="md"
						disabled={pending}
						error={fieldErrors.repeatPassword}
					/>
				</Stack>

				<Group justify="space-between" mt="lg">
					<Button fullWidth={true} radius="xl" type="submit" loading={pending}>
						Save new password
					</Button>
				</Group>
			</form>
		</>
	);
}
