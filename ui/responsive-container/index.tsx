"use client";

import { Container, createTheme, MantineProvider } from "@mantine/core";
import cx from "clsx";
import classes from "./styles.module.css";

const theme = createTheme({
	components: {
		Container: Container.extend({
			classNames: (_, { size }) => ({
				root: cx({ [classes.responsiveContainer]: size === "responsive" }),
			}),
		}),
	},
});

export function ResponsiveContainer({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<MantineProvider theme={theme}>
			<Container size="responsive">{children}</Container>
		</MantineProvider>
	);
}
