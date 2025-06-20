import { Paper, Text } from "@mantine/core";

export default function SignUpSuccessPage() {
	return (
		<Paper radius="md" p="lg" withBorder={true} maw={400} mx="auto" my="xl">
			<Text size="lg" fw={500} ta="center" mb="md">
				This is onboarding page!!
			</Text>
		</Paper>
	);
}
