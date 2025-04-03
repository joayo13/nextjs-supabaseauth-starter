import { createClient } from "@/utils/supabase/server";
import { ChevronRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const randomGreetings = () => {
    const greetings = ["Hey", "Greetings", "Howdy", "Yo", "Sup", "Top of the mornin'", "Wazzap", "Oi"];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: lists } = await supabase.from("lists").select("*").eq("owner", user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1 className="text-2xl font-medium">{randomGreetings()}, {user.user_metadata.username}!</h1>
      <ul className="flex flex-col gap-2 items-start">
        <h2 className="text-sm text-muted-foreground">Owned lists</h2>

        {lists?.map((list) => (
          <li key={list.id}>
            <Link href={`/lists/${list.id}`} className="flex items-center gap-2">
              <span>{list.name}</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
