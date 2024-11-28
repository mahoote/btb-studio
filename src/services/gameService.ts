import { supabase } from '../supabaseClient'
import { GameDto, GameInsertDto, GameTranslationInsertDto } from '../types/gameDto'
import { SupabaseResponse } from '../types/supabaseResponse'
import { GameHasAccessoryDto } from '../types/gameHasAccessoryDto'

/**
 * Creates a new game.
 * Creates the game translations for the game.
 * @param game
 * @param gameTranslations
 */
async function createGame(
    game: GameInsertDto,
    gameTranslations: GameTranslationInsertDto[]
): Promise<GameDto | null> {
    const { data, error }: SupabaseResponse<GameDto> = await supabase
        .from('game')
        .insert([game])
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    for (const gameTranslation of gameTranslations) {
        await createGameTranslation({ ...gameTranslation, game_id: data?.id ?? 0 })
    }

    return data as GameDto
}

/**
 * Deletes a new game.
 * @param gameId
 */
async function deleteNewGame(gameId: number) {
    const { error }: SupabaseResponse<GameDto> = await supabase
        .from('game')
        .delete()
        .eq('id', gameId)

    if (error) {
        throw new Error(error.message)
    }
}

async function createGameHasAccessory(gameId: number, accessoryId: number) {
    const { error }: SupabaseResponse<GameHasAccessoryDto> = await supabase
        .from('game_has_accessory')
        .insert({ game_id: gameId, accessory_id: accessoryId })

    if (error) {
        throw new Error(error.message)
    }
}

async function createGameHasGameType(gameId: number, gameTypeId: number) {
    const { error }: SupabaseResponse<GameHasAccessoryDto> = await supabase
        .from('game_has_game_type')
        .insert({ game_id: gameId, game_type_id: gameTypeId })

    if (error) {
        throw new Error(error.message)
    }
}

async function createGameTranslation(gameTranslation: GameTranslationInsertDto) {
    const { error }: SupabaseResponse<GameDto> = await supabase
        .from('game_translation')
        .insert([gameTranslation])

    if (error) {
        throw new Error(error.message)
    }
}

export { createGame, createGameHasAccessory, createGameHasGameType, deleteNewGame }
