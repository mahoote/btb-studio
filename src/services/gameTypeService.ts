import { supabaseGame } from '../supabaseClient'
import { GenericType } from '../types/genericType'

export async function getGameTypes(): Promise<GenericType[]> {
    const { data, error } = await supabaseGame.from('game_type').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}
