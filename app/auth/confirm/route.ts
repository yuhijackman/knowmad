import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { ONBOARDING_PATH } from "@/constants/routes";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const tokenHash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? ONBOARDING_PATH;

	if (tokenHash && type) {
		const supabase = await createClient();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash: tokenHash,
		});
		if (!error) {
			redirect(next);
		}
	}

	// redirect the user to an error page with some instructions
	redirect("/error");
}
