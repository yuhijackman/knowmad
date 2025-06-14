import { Button, Paper, Stack, Text, Title } from "@mantine/core";

export default function Home() {
	return (
		<Stack align="center" mt="xl">
			<Title>Welcome to Knowmad</Title>

			{/* This Text component will use the default color from your theme */}
			<Text>Your personal learning journey starts here.</Text>

			{/*
			This Paper component will use the default background
			you set in theme.components.Paper (brandGray.0)
		  */}
			<Paper withBorder={true} shadow="md" p="lg" mt="md">
				<Stack>
					{/* This button will use your primaryColor ('focusBlue') */}
					<Button>Primary Action</Button>

					{/* You can explicitly use your other theme colors */}
					<Button color="growthGreen">Start Learning</Button>
					<Button color="inspirationPeach" variant="light">
						Get Inspired
					</Button>
				</Stack>
			</Paper>
		</Stack>
	);
}
