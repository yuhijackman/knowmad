import { Paper, Text } from "@mantine/core";

export default function SignUpSuccessPage() {
	return (
		<Paper radius="md" p="lg" withBorder={true} maw={400} mx="auto" my="xl">
			<Text size="lg" fw={500} ta="center" mb="md">
				Thank you for signing up!
			</Text>

			<Text size="sm" mt="sm" c="dimmed">
				You&apos;ve successfully signed up. Please check your email to verify
				your email address.
			</Text>
		</Paper>
	);
}
