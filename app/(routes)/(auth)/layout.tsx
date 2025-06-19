import { Container, Flex } from "@mantine/core";

export default function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<Container size="sm" h="100vh">
			<Flex align="center" justify="center" h="100%">
				{children}
			</Flex>
		</Container>
	);
}
