import { supabase } from '../supabaseClient'
import { GameCategory } from '../models/gameCategory'

export async function getGameCategories(): Promise<GameCategory[]> {
    const { data, error } = await supabase.from('game_category').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GameCategory[]
}
