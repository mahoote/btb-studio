import { supabaseGame } from '../supabaseClient'
import { GenericType } from '../types/genericType'

export async function getGameCategories(): Promise<GenericType[]> {
    const { data, error } = await supabaseGame.from('game_category').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GenericType[]
}
