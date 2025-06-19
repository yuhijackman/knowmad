import { GithubButton } from "@/features/authentication/github-button";
import { GoogleButton } from "@/features/authentication/google-button";
import { LoginForm } from "@/features/authentication/login-form";
import { Divider, Group, Paper, Text } from "@mantine/core";

export default function LoginPage() {
	return (
		<Paper radius="md" p="lg" withBorder={true} maw={400} mx="auto" my="xl">
			<Text size="lg" fw={500} ta="center" mb="md">
				Welcome to Learning Realms
			</Text>

			<Group grow={true} mb="md" mt="md">
				<GoogleButton radius="xl">Google</GoogleButton>
				<GithubButton radius="xl">GitHub</GithubButton>
			</Group>

			<Divider label="Or continue with email" labelPosition="center" my="lg" />

			<LoginForm />
		</Paper>
	);
}
