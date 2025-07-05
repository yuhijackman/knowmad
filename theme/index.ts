import { createTheme, type MantineColorsTuple } from "@mantine/core";
import { Figtree } from "next/font/google";

const figtree = Figtree({
	variable: "--font-figtree",
	subsets: ["latin"],
	display: "swap",
});

const mutedSalmon: MantineColorsTuple = [
	"#fdf5f3",
	"#f9e9e6",
	"#f1d6cd",
	"#eac2b3",
	"#e2ae9d",
	"#dca18e",
	"#d99b86", // The closest shade to the target #E58B78
	"#c08573",
	"#aa7565",
	"#946456",
];

const cozyGray: MantineColorsTuple = [
	"#FAF9F7", // 0: Linen White (Primary Background)
	"#F4F3F1", // 1: Parchment (Secondary Background / Cards)
	"#EAE9E7", // 2: Subtle Line (Borders)
	"#DDDBD8", // 3: UI Element Hover
	"#C7C6C3", // 4: Disabled Elements
	"#A8A7A4", // 5: Medium Gray
	"#8A8986", // 6: Muted UI Elements / Secondary Text
	"#646361", // 7:
	"#4D4C4A", // 8:
	"#3F3D3C", // 9: Charcoal (Primary Text)
];

const successGreen: MantineColorsTuple = [
	"#ebf7f0",
	"#d3eadd",
	"#b8ddc6",
	"#9bcdad",
	"#82c297",
	"#6eb985",
	"#61b47c",
	"#529f6c",
	"#488d5f",
	"#3c7a51",
];
const warningAmber: MantineColorsTuple = [
	"#fef4ea",
	"#fbe6d2",
	"#f8d5b6",
	"#f6c395",
	"#f5b27b",
	"#f4a96c",
	"#f4a261",
	"#da8e52",
	"#c17c46",
	"#a96a39",
];
const errorRed: MantineColorsTuple = [
	"#faeaea",
	"#f1d2d2",
	"#e7b6b6",
	"#dd9a9a",
	"#d58181",
	"#d07171",
	"#d06565",
	"#b85555",
	"#a34a4a",
	"#8f3e3e",
];

export const theme = createTheme({
	/* ### Base Properties ### */
	fontFamily: `${figtree.style.fontFamily}, Verdana, sans-serif`,
	primaryColor: "mutedSalmon",
	primaryShade: 6,

	/* ### Color Definitions ### */
	colors: {
		// Brand colors
		mutedSalmon,
		cozyGray,
		// Semantic colors
		successGreen,
		warningAmber,
		errorRed,
	},

	/* ### Base Styles ### */
	// Override white/black to align with our cozy palette
	white: cozyGray[0], // Linen White
	black: cozyGray[9], // Charcoal

	/* ### Custom Properties for Easy Access ### */
	other: {
		linenWhite: cozyGray[0],
		parchment: cozyGray[1],
		charcoalText: cozyGray[9],
		stoneGray: cozyGray[6],
	},

	/* ### Default Component Overrides ### */
	components: {
		Paper: {
			defaultProps: {
				bg: "cozyGray.0",
			},
		},
		Card: {
			defaultProps: {
				bg: "cozyGray.1",
			},
		},
		AppShell: {
			defaultProps: {
				bg: "cozyGray.0",
			},
		},
		Button: {
			defaultProps: {
				radius: "sm",
			},
		},
		Text: {
			defaultProps: {
				c: "cozyGray.9",
			},
		},
		Title: {
			defaultProps: {
				c: "cozyGray.9",
			},
		},
	},
});
