import { supabase } from '../supabaseClient'
import { GameType } from '../types/gameType'

export async function getGameTypes(): Promise<GameType[]> {
    const { data, error } = await supabase.from('game_type').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GameType[]
}
