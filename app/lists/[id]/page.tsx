'use client';

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ListPage() {
    const params = useParams();
    const [listName, setListName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchList() {
            if (!params.id) return;

            const { data, error } = await supabase
                .from("lists")
                .select("name")
                .eq("id", params.id)
                .single();

            if (error) {
                console.error("Error fetching list:", error);
                return;
            }

            setListName(data.name);
            setLoading(false);
        }

        fetchList();
    }, [params.id, supabase]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!listName) {
        return <div>List not found</div>;
    }

    return (
        <div className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">{listName}</h1>
        </div>
    );
} 