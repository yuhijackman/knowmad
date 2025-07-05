import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/constants/routes"; // Assuming this constant lives somewhere like `lib/constants.ts`
import { createClient } from "@/utils/supabase/server";

/**
 * A "gatekeeper" function for Server Components. It fetches the user
 * from the data source and redirects if they are not authenticated.
 * This belongs in the data access layer.
 *
 * @returns {Promise<User>} The authenticated user object.
 */
export async function protectPage(): Promise<User> {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error || !user) {
			redirect(LOGIN_PATH);
		}

		return user;
	} catch (_e) {
		redirect(LOGIN_PATH);
	}
}

/**
 * A data access function to retrieve the current user without enforcing
 * a redirect.
 *
 * @returns {Promise<User | null>} The user object or null.
 */
export async function getCurrentUser(): Promise<User | null> {
	try {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		return user;
	} catch (_e) {
		return null;
	}
}
