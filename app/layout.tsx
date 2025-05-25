import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
	variable: "--font-figtree",
	subsets: ["latin"],
	display: 'swap',
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: 'swap'
});

export const metadata: Metadata = {
	title: "Knowmad",
	description: "Your personal Self Learning OS",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${figtree.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
