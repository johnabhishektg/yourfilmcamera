import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

export default async function CreateLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  {
    if (user.publicMetadata.role !== "admin") {
      redirect("/");
    }
  }

  return <main>{children}</main>;
}
