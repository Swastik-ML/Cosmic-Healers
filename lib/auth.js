import { supabase } from './supabaseClient'
export async function getProfile(userId){
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  if(error) return null
  return data
}
