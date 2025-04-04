import Link from "next/link";
import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Your next app starts here.
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <p>
        <Link className="underline" href="/sign-up">Sign up</Link> to get started.
      </p>
    </div>
  );
}
