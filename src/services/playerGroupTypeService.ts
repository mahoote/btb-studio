import { supabase } from '../supabaseClient'
import { GenericType } from '../types/genericType'

export async function getPlayerGroupTypes(): Promise<GenericType[]> {
    const { data, error } = await supabase.from('player_group_type').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}
