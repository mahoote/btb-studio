import { supabase } from '../supabaseClient'
import { GenericType } from '../types/genericType'

export async function getGameTypes(): Promise<GenericType[]> {
    const { data, error } = await supabase.from('game_type').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}
