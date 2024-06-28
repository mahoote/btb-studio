import { supabase } from '../supabaseClient.ts'
import { GameCategory } from '../models/gameCategory.ts'

export async function getGameCategories(): Promise<GameCategory[]> {
    const { data, error } = await supabase.from('game_category').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GameCategory[]
}
