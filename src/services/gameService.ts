import { supabase } from '../supabaseClient'
import { GameDto, GameInsertDto } from '../types/game'
import { SupabaseResponse } from '../types/supabaseResponse'
import { GameHasAccessoryDto } from '../types/gameHasAccessory'

export async function createGame(game: GameInsertDto): Promise<GameDto | null> {
    const { data, error }: SupabaseResponse<GameDto> = await supabase
        .from('game')
        .insert([game])
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data as GameDto
}

export async function createGameHasAccessory(gameId: number, accessoryId: number) {
    const { error }: SupabaseResponse<GameHasAccessoryDto> = await supabase
        .from('game_has_accessory')
        .insert({ game_id: gameId, accessory_id: accessoryId })

    if (error) {
        throw new Error(error.message)
    }
}
