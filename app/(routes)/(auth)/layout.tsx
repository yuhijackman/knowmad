import { Container, Flex } from "@mantine/core";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Container size="sm">
			<Flex align="center" justify="center" h="100%">
				{children}
			</Flex>
		</Container>
	);
}
