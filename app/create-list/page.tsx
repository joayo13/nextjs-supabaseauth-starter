import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import { createList } from "../actions/lists";;
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function CreateListPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }
    return (
        <form className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">Create a new list</h1>
            <p className="text-sm text text-foreground">
                <Link className="text-primary font-medium underline" href="/dashboard">
                    Back to dashboard
                </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="name">List Name</Label>
                <Input name="name" placeholder="Enter list name" required />
                <SubmitButton formAction={createList} pendingText="Creating...">
                    Create List
                </SubmitButton>
            </div>
        </form>
    );
} 