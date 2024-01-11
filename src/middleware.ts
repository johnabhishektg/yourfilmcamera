import { authMiddleware, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/cart(.*)",
    "/blog(.*)",
    "/checkout(.*)",
    "/categories(.*)",
    "/products(.*)",
    "/product(.*)",
    "/build-a-camera(.*)",
    "/email-preferences(.*)",
    "/about(.*)",
    "/contact(.*)",
    "/terms(.*)",
    "/privacy(.*)",
    "/api(.*)",
  ],

  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }

    // Set the user's role to user if it doesn't exist
    const user = await clerkClient.users.getUser(auth.userId);

    if (!user) {
      throw new Error("User not found.");
    }

    // If the user doesn't have a role, set it to user
    // if (!user.privateMetadata.role) {
    //   await clerkClient.users.updateUserMetadata(auth.userId, {
    //     privateMetadata: {
    //       role: "user" satisfies UserRole,
    //     },
    //   })
    // }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
