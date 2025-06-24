import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import {
	DASHBOARD_PATH,
	LOGIN_PATH,
	ONBOARDING_PATH,
	SIGN_UP_PATH,
} from "@/constants/routes";

const PROTECTED_PATHS = [DASHBOARD_PATH, ONBOARDING_PATH];

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (supabaseUrl === undefined) {
		throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
	}
	if (supabaseAnonKey === undefined) {
		throw new Error(
			"Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable",
		);
	}

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				for (const { name, value } of cookiesToSet) {
					request.cookies.set(name, value);
				}
				supabaseResponse = NextResponse.next({
					request,
				});
				for (const { name, value, options } of cookiesToSet) {
					supabaseResponse.cookies.set(name, value, options);
				}
			},
		},
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();
	const isProtectedPath = PROTECTED_PATHS.some((path) =>
		request.nextUrl.pathname.startsWith(path),
	);
	if (!user && isProtectedPath) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = LOGIN_PATH;
		return NextResponse.redirect(redirectUrl);
	}
	if (
		user &&
		(request.nextUrl.pathname === LOGIN_PATH ||
			request.nextUrl.pathname === SIGN_UP_PATH)
	) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = DASHBOARD_PATH;
		return NextResponse.redirect(redirectUrl);
	}

	return supabaseResponse;
}
