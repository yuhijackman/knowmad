import { Paper, Text } from "@mantine/core";

export default function LoginPage() {
	return (
		<Paper radius="md" p="lg" withBorder={true} maw={400} mx="auto" my="xl">
			<Text size="lg" fw={500} ta="center" mb="md">
				Your Learning Realms Dashboard
			</Text>
		</Paper>
	);
}
