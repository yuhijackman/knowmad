import { Alert, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { GithubButton } from "@/features/authentication/github-button";
import { GoogleButton } from "@/features/authentication/google-button";
import { SignUpForm } from "@/features/authentication/sign-up-form";

export default function SignUpPage() {
	return (
		<Paper radius="md" p="lg" withBorder={true} maw={400} mx="auto" my="xl">
			<Stack>
				<Alert variant="light" color="orange" title="Warning">
					Sign-up with Google and GitHub is coming soon!
				</Alert>
				<Text size="lg" fw={500} ta="center" mb="md">
					Register with
				</Text>
				<Group grow={true} mb="md" mt="md">
					<GoogleButton disabled={true} radius="xl">
						Google
					</GoogleButton>
					<GithubButton disabled={true} radius="xl">
						GitHub
					</GithubButton>
				</Group>
			</Stack>

			<Divider label="Or continue with email" labelPosition="center" my="lg" />

			<SignUpForm />
		</Paper>
	);
}
