import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {

    const { data, error } = await supabase.from('beat_items').select('*');

    if(error){
        console.error('error fetching beats: ', error);
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json(data);
}