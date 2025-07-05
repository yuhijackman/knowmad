import { z } from "zod";
import { insertProfileSchema } from "@/lib/schemas/profiles.schemas";
import { insertRealmSchema } from "@/lib/schemas/realms.schemas";

const baseOnboardingSchema = insertProfileSchema.extend(
	insertRealmSchema.shape,
);

export const onboardingFormSchema = baseOnboardingSchema.extend({
	avatarFile: z.instanceof(File).optional(),
});
