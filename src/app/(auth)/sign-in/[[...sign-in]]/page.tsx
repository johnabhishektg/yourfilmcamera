import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-fit m-auto">
      <SignIn />
    </div>
  );
}
