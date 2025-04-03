import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function ListPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: list, error } = await supabase
        .from("lists")
        .select("name")
        .eq("id", id)
        .single();

    if (error || !list) {
        notFound();
    }

    return (
        <div className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">{list.name}</h1>
        </div>
    );
} 