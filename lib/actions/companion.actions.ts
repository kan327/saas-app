'use server'

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formdata: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .insert({...formdata, author})
    .select()
  
  if(error || !data) throw new Error(error?.message || 'Failed To Create a Companion')
  
  return data[0];
}