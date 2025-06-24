import { UpdatePasswordForm } from "@/features/authentication/update-password-form";
import { Container, Text, Title } from "@mantine/core";
import classes from "./password-reset.module.css";

export default function PasswordResetPage() {
	return (
		<Container size={460} my={30}>
			<Title className={classes.title} ta="center">
				Reset Your Password
			</Title>
			<Text c="dimmed" fz="sm" ta="center" mb="lg">
				Please enter your new password below.
			</Text>

			<UpdatePasswordForm />
		</Container>
	);
}
