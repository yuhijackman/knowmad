import "@mantine/core/styles.css"; //
import { theme } from "@/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";

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
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body className="antialiased">
				<MantineProvider theme={theme} defaultColorScheme="auto">
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
