import { type MantineColorsTuple, createTheme } from "@mantine/core";
import { Figtree } from "next/font/google";

const figtree = Figtree({
	variable: "--font-figtree",
	subsets: ["latin"],
	display: "swap",
});

// Generating 10-shade palettes for our accent colors
const focusBlue: MantineColorsTuple = [
	"#eaf0f8",
	"#d0dceb",
	"#b3c6de",
	"#95b1d2",
	"#7c9dc7",
	"#6a8fc1",
	"#5d88be",
	"#4a75a9",
	"#416896",
	"#355a83",
];
const growthGreen: MantineColorsTuple = [
	"#edf2ee",
	"#d9e2da",
	"#c1cfc3",
	"#a8bca9",
	"#92aa93",
	"#839f84",
	"#78977a",
	"#68846b",
	"#5d755f",
	"#506652",
];
const inspirationPeach: MantineColorsTuple = [
	"#faede7",
	"#f1d8cc",
	"#e7c0ae",
	"#dea78e",
	"#d79376",
	"#d48c70",
	"#cf8366",
	"#b77156",
	"#a4654d",
	"#915742",
];
const wisdomViolet: MantineColorsTuple = [
	"#f2eff4",
	"#e2dbe5",
	"#cfc3d4",
	"#bbabcc",
	"#a996c5",
	"#9d8ac0",
	"#9681bc",
	"#836fA7",
	"#756394",
	"#675681",
];
const clarityGold: MantineColorsTuple = [
	"#f9f3e9",
	"#efeadb",
	"#e4dcc2",
	"#dacfa8",
	"#d2c390",
	"#cdae78",
	"#cbac6c",
	"#b3975a",
	"#a0874e",
	"#8d7641",
];

// Semantic Colors
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

// Our custom neutral palette based on the original design
const brandGray: MantineColorsTuple = [
	"#EFF0F3", // 0: Paper White (Background)
	"#E7E8EC", // 1: Light Slate (UI Elements)
	"#E0E1E6", // 2: Subtle Line (Borders)
	"#D8D9E0", // 3
	"#CDCED7", // 4
	"#B9BBC6", // 5
	"#8B8D98", // 6: Medium Gray (Secondary Text/Icons)
	"#80828D", // 7
	"#62636C", // 8: Charcoal (Primary Text)
	"#1E1F24", // 9
];

export const theme = createTheme({
	/* ### Base Properties ### */
	fontFamily: `${figtree.style.fontFamily}, Verdana, sans-serif`,
	primaryColor: "focusBlue",
	primaryShade: 6,

	/* ### Color Definitions ### */
	colors: {
		// Brand colors
		focusBlue,
		growthGreen,
		inspirationPeach,
		wisdomViolet,
		clarityGold,
		// Custom gray scale
		brandGray,
		// Semantic colors
		successGreen,
		warningAmber,
		errorRed,
	},

	/* ### Base Styles ### */
	white: "#fff",
	black: "#1E1F24",

	/* ### Custom Properties for Easy Access ### */
	other: {
		paperWhite: brandGray[0],
		lightSlate: brandGray[1],
		charcoalText: brandGray[9],
	},

	/* ### Default Component Overrides ### */
	components: {
		Paper: {
			defaultProps: {
				bg: "brandGray.0", // Use Paper White for Paper components
			},
		},
		Card: {
			defaultProps: {
				bg: "brandGray.1", // Use Light Slate for Card components
			},
		},
		AppShell: {
			defaultProps: {
				bg: "brandGray.0",
			},
		},
		Button: {
			defaultProps: {
				radius: "sm",
			},
		},
		Text: {
			defaultProps: {
				c: "brandGray.9", // Default text color is Charcoal
			},
		},
		Title: {
			defaultProps: {
				c: "brandGray.9",
			},
		},
	},
});
