import { LOGIN_PATH } from "@/constants/routes";
import { createClient } from "@/utils/supabase/server";
import { Container, Flex } from "@mantine/core";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

/**
 * @param children
 */
export default async function AuthenticatedLayout({
	children,
}: { children: ReactNode }) {
	const supabase = await createClient();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		redirect(LOGIN_PATH);
	}

	return (
		<Container size="sm" h="100vh">
			<Flex align="center" justify="center" h="100%">
				{children}
			</Flex>
		</Container>
	);
}
