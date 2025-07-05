import "@mantine/core/styles.css"; //
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import type { Metadata } from "next";
import { theme } from "@/theme";
import "@/ui/global.css";

export const metadata: Metadata = {
	title: "Learning Realms",
	description: "Your personal Self Learning OS",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme="auto">
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
