"use server";

import { createClient } from "@/utils/supabase/server";

export const createList = async (list: List) => {
    const supabase = await createClient();

    const { data, error } = await supabase.from("lists").insert(list).select();

    if (error) {
        throw new Error(error.message);
    }
};