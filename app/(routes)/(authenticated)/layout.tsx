import { Container, Flex } from "@mantine/core";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { LOGIN_PATH } from "@/constants/routes";
import { createClient } from "@/utils/supabase/server";

/**
 * @param children
 */
export default async function AuthenticatedLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<Container fluid h="100vh" p="0">
			<Flex w="100%" h="100%">
				{children}
			</Flex>
		</Container>
	);
}
