"use server";

import { createClient } from "@/utils/supabase/server";
import { List } from "@/app/types";

export const createList = async (formData: FormData) => {
    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("User not authenticated");
    }

    // Get user's profile for username
    const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

    if (!profile) {
        throw new Error("User profile not found");
    }

    const list: List = {
        name: formData.get("name") as string,
        owner: user.id,
        owner_username: profile.username
    };

    const { error } = await supabase.from("lists").insert(list);

    if (error) {
        throw new Error(error.message);
    }
};