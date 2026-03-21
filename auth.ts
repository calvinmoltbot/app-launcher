import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const ALLOWED_USERS = new Set(["calvinmoltbot"]);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    signIn({ profile }) {
      return ALLOWED_USERS.has(profile?.login as string);
    },
    authorized({ auth: session, request }) {
      const isLoggedIn = !!session?.user;
      const isOnSignIn = request.nextUrl.pathname.startsWith("/sign-in");

      if (isOnSignIn) return true;
      return isLoggedIn;
    },
  },
});
