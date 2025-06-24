import { ForgotPasswordForm } from "@/features/authentication/forgot-password-form";
import { Container, Text, Title } from "@mantine/core";
import classes from "./forgot-password.module.css";

export default function ForgotPasswordPage() {
	return (
		<Container size={460} my={30}>
			<Title className={classes.title} ta="center">
				Forgot your password?
			</Title>
			<Text c="dimmed" fz="sm" ta="center">
				Enter your email to get a reset link
			</Text>

			<ForgotPasswordForm />
		</Container>
	);
}
