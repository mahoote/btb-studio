import { supabase } from '../supabaseClient'
import { GameDto, GameInsertDto } from '../types/gameDto'
import { SupabaseResponse } from '../types/supabaseResponse'
import { GameHasAccessoryDto } from '../types/gameHasAccessoryDto'

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

export async function createGameHasGameType(gameId: number, gameTypeId: number) {
    const { error }: SupabaseResponse<GameHasAccessoryDto> = await supabase
        .from('game_has_game_type')
        .insert({ game_id: gameId, game_type_id: gameTypeId })

    if (error) {
        throw new Error(error.message)
    }
}
