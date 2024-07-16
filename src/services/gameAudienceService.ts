import { supabase } from '../supabaseClient'
import { GameAudience } from '../types/gameAudience'

export async function getGameAudience(): Promise<GameAudience[]> {
    const { data, error } = await supabase.from('game_audience').select('*')

    if (error) {
        throw new Error(error.message)
    }
    return data as GameAudience[]
}
