import {
    createGame,
    createGameHasAccessory,
    createGameHasGameType,
} from '../services/gameService'
import { GameInsertDto, GameTranslationInsertDto } from '../types/gameDto'
import { GenericType } from '../types/genericType'
import { AdvancedSettings, NewGame, NewGameTranslations } from '../types/newGame'

/**
 * Creates a new game as well as the accessories and game types associated with it.
 * @param newGameData
 * @param advancedDefaultSettings
 * @param newGameTranslations
 */
export async function createNewGame(
    newGameData: NewGame,
    advancedDefaultSettings: AdvancedSettings,
    newGameTranslations: NewGameTranslations
) {
    // New Game
    const gameInsertDto: GameInsertDto = {
        min_players: newGameData.minPlayers,
        max_players: newGameData.maxPlayers,
        activity_level: newGameData.activityLevel,
        drunk_level: newGameData.drunkLevel,
        minutes: newGameData.minutes,
        player_group_type_id: newGameData.playerGroupTypeId,
        game_audience_id: newGameData.gameAudienceId,
        game_category_id: newGameData.categoryId,
        game_end_type: advancedDefaultSettings.gameEndType,
    }

    // New Game Translations
    const newGameTranslationInsertDtos: GameTranslationInsertDto[] = [
        {
            language: 'en',
            name: newGameData.name,
            intro_description: newGameData.introDescription,
            descriptions: getValidDescriptions(newGameData.descriptions),
            custom_end_game_sentence: advancedDefaultSettings.customEndGameSentence,
        },
    ]

    Object.entries(newGameTranslations).forEach(([key, translation]) => {
        newGameTranslationInsertDtos.push({
            language: key,
            name: translation.name,
            intro_description: translation.introDescription,
            descriptions: getValidDescriptions(translation.descriptions),
            custom_end_game_sentence: translation.customEndGameSentence,
        })
    })

    return await createGame(gameInsertDto, newGameTranslationInsertDtos)
}

/**
 * Iterates through the selected accessories and adds them to the new game.
 * @param selectedAccessories
 * @param accessories
 * @param newGameId
 */
export async function addAccessoriesToGame(
    selectedAccessories: string[],
    accessories: GenericType[] | null,
    newGameId: number
) {
    for (const accessory of selectedAccessories) {
        const accessoryId =
            accessories?.find(accessoryItem => accessoryItem.name === accessory)?.id ?? 0

        if (accessoryId === 0) {
            console.error('Could not find accessory:', accessory)
            throw new Error('Could not find accessory.')
        }

        await createGameHasAccessory(newGameId, accessoryId)
    }
}

/**
 * Iterates through the selected game types and adds them to the new game.
 * @param selectedGameTypes
 * @param gameTypes
 * @param newGameId
 */
export async function addGameTypesToGame(
    selectedGameTypes: string[],
    gameTypes: GenericType[] | null,
    newGameId: number
) {
    for (const gameType of selectedGameTypes) {
        const gameTypeId =
            gameTypes?.find(gameTypeItem => gameTypeItem.name === gameType)?.id ?? 0

        if (gameTypeId === 0) {
            console.error('Could not find game type:', gameType)
            throw new Error('Could not find game type.')
        }

        await createGameHasGameType(newGameId, gameTypeId)
    }
}

/**
 * Filters out empty descriptions.
 * @param descriptions
 */
export const getValidDescriptions = (descriptions: string[]): string[] => {
    return descriptions.filter(description => description !== '')
}
