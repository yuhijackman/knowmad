import { Button, type ButtonProps } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";

export function GithubButton(
	props: ButtonProps & React.ComponentPropsWithoutRef<"button">,
) {
	return (
		<Button
			leftSection={<GithubIcon size={16} color="#495057" />}
			variant="default"
			{...props}
		/>
	);
}
