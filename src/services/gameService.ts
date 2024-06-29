import { supabase } from '../supabaseClient'
import { GameDto, GameInsertDto } from '../types/game'
import { SupabaseResponse } from '../types/supabaseResponse'

export async function createGame(game: GameInsertDto): Promise<GameDto> {
    const { data, error }: SupabaseResponse<GameDto> = await supabase
        .from('game')
        .insert([game])
        .select()
        .limit(1)
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data as GameDto
}
