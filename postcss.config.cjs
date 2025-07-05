module.exports = {
	plugins: {
		"@csstools/postcss-global-data": {
			files: [
				// We use path.resolve to create a reliable, absolute path to the file.
				// IMPORTANT: Adjust this path to match the location of your global.css file!
				"./ui/global.css",
			],
		},
		"postcss-preset-mantine": {},
		"postcss-custom-media": {},
	},
};
