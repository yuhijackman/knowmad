import { GithubButton } from "@/features/authentication/github-button";
import { GoogleButton } from "@/features/authentication/google-button";
import { SignUpForm } from "@/features/authentication/sign-up-form";
import { Divider, Group, Paper, Text } from "@mantine/core";

export default function SignUpPage() {
	return (
		<Paper radius="md" p="lg" withBorder={true} maw={400} mx="auto" my="xl">
			<Text size="lg" fw={500} ta="center" mb="md">
				Register with
			</Text>

			<Group grow={true} mb="md" mt="md">
				<GoogleButton radius="xl">Google</GoogleButton>
				<GithubButton radius="xl">GitHub</GithubButton>
			</Group>

			<Divider label="Or continue with email" labelPosition="center" my="lg" />

			<SignUpForm />
		</Paper>
	);
}
