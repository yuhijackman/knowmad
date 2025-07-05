import { Container, Flex, Paper, Text, Title } from "@mantine/core";
import { protectPage } from "@/lib/data/authentication";
import { ResponsiveContainer } from "@/ui/responsive-container";
import classes from "./styles.module.css";

export default async function OnboardingPage() {
	const currentUser = await protectPage();

	// get templates from db
	const templates = mockTemplates;
	console.log(currentUser);

	return (
		<main className={classes.pageWrapper}>
			<ResponsiveContainer>
				<Flex justify="center" align="center" direction="column" mt="xl">
					<Title>
						Welcome to Your Realms!
						<br />
						We'll help you get set up🧙
					</Title>
				</Flex>
			</ResponsiveContainer>
		</main>
	);
}

const mockTemplates = [
	{
		template_name: "Learn Python Basics",
		suggested_icon: "🐍",
		default_description:
			"A structured space to learn the fundamentals of Python programming.",
		modules: [
			{
				module_name: "Module 1: Setup & Introduction",
				placeholder_tasks: [
					{ title: "Install Python and VS Code" },
					{ title: "Run your first 'Hello, World!' script" },
					{ title: "Understand basic Python syntax and variables" },
				],
				suggested_resource_categories: ["Setup Guides", "Tutorials"],
			},
			{
				module_name: "Module 2: Core Concepts",
				placeholder_tasks: [
					{
						title:
							"Learn about Data Types (integers, strings, lists, dictionaries)",
					},
					{ title: "Understand Control Flow (if/else, loops)" },
					{ title: "Practice writing basic functions" },
				],
				suggested_resource_categories: ["Documentation", "Practice Exercises"],
			},
			{
				module_name: "Module 3: Simple Project",
				placeholder_tasks: [
					{
						title:
							"Brainstorm a small project idea (e.g., a simple calculator)",
					},
					{ title: "Outline the project steps" },
					{ title: "Build and test the project" },
				],
				suggested_resource_categories: ["Project Ideas", "Code Examples"],
			},
		],
		default_task_statuses: ["To Do", "In Progress", "Review", "Completed"], // Could even suggest Kanban columns
		default_resource_categories_global: [
			"Official Docs",
			"Video Tutorials",
			"Articles",
			"Books",
			"Tools",
		],
	},
];
