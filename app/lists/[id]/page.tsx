import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

type ListPageParams = {
    params: {
        id: string;
    };
};

export default async function ListPage({ params }: ListPageParams) {
    const supabase = await createClient();

    const { data: list, error } = await supabase
        .from("lists")
        .select("name")
        .eq("id", params.id)
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