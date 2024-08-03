import { supabase } from '../supabaseClient'
import { GenericType } from '../types/genericType'

export async function getGameAudience(): Promise<GenericType[]> {
    const { data, error } = await supabase.from('game_audience').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}
